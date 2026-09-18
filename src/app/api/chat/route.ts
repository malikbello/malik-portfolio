import { NextRequest, NextResponse } from "next/server";
import { buildKnowledgeBase, SYSTEM_INSTRUCTION } from "@/config/aiKnowledge";
import { siteConfig } from "@/config/siteData";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

// In-memory sliding-window limiter, keyed by IP. Resets whenever the serverless
// instance recycles — not as strong as a shared store (Redis/KV), but adds a
// real cost-control layer against direct API abuse with zero extra infra.
// The 10-questions-per-session cap the visible chat UI enforces is the primary
// defense; this is the defense-in-depth backstop for anyone bypassing the UI.
const RATE_LIMIT = 20;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  if (hits.size > 5000) {
    // Cheap cleanup so the map can't grow unbounded across a long-lived instance.
    for (const [key, ts] of hits) {
      if (ts.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return timestamps.length > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        reply: `I've answered a lot of questions this hour — let's take this to email so Malik can dig in properly. Reach him at **${siteConfig.email}**, or use the "Let's Talk" button.`,
      },
      { status: 200 }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = (body.messages ?? []).slice(-12); // keep payloads small
  if (messages.length === 0) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        reply:
          "The AI assistant isn't wired up yet — but you can still reach Malik directly at belloayopelumi@gmail.com or via LinkedIn.",
      },
      { status: 200 }
    );
  }

  const model = process.env.GEMINI_MODEL || "gemini-3.6-flash";
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content.slice(0, 2000) }],
  }));

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nCONTEXT ABOUT MALIK:\n${buildKnowledgeBase()}` }],
          },
          contents,
          tools: [{ codeExecution: {} }],
          generationConfig: {
            temperature: 0.95,
            topP: 0.95,
            maxOutputTokens: 2000,
            thinkingConfig: { thinkingBudget: 0 },
          },
        }),
      }
    );

    if (!res.ok) {
      if (res.status === 429) {
        console.error("Gemini free-tier quota exhausted");
        return NextResponse.json(
          {
            reply:
              "I'm getting a lot of traffic right now and I'm out of free-tier requests for today — sorry about that. Email Malik directly at belloayopelumi@gmail.com, or try me again tomorrow.",
          },
          { status: 200 }
        );
      }
      console.error("Gemini API error", res.status);
      return NextResponse.json(
        { reply: "The AI hit a snag processing that. Try again, or email belloayopelumi@gmail.com directly." },
        { status: 200 }
      );
    }

    const data = await res.json();
    const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> =
      data?.candidates?.[0]?.content?.parts ?? [];

    if (parts.length === 0) {
      return NextResponse.json({
        reply: "I couldn't generate a response — try rephrasing, or reach Malik directly at belloayopelumi@gmail.com.",
      });
    }

    // Turn any generated chart/image into an inline markdown image so the
    // existing markdown renderer displays it right in the chat bubble.
    const text = parts
      .map((p) => {
        if (p.text) return p.text;
        if (p.inlineData) return `\n\n![chart](data:${p.inlineData.mimeType};base64,${p.inlineData.data})\n\n`;
        return "";
      })
      .join("");

    return NextResponse.json({ reply: text || "I couldn't generate a response — try rephrasing." });
  } catch {
    return NextResponse.json(
      { reply: "Something went wrong reaching the AI. You can always email belloayopelumi@gmail.com directly." },
      { status: 200 }
    );
  }
}
