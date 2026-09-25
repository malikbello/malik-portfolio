"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/siteData";

export type ChatMessage = { role: "user" | "assistant"; content: string };

type ChatContextValue = {
  messages: ChatMessage[];
  loading: boolean;
  send: (text: string) => Promise<string | null>;
};

const ChatContext = createContext<ChatContextValue | null>(null);

const WELCOME: ChatMessage = {
  role: "assistant",
  content: `Hey — I'm ${siteConfig.aiName}, a replica of part of Malik's brain: his work, his projects, his way of thinking, rebuilt to talk to. I don't know everything he does — honestly, probably not even 10% of it — but I answer as him, first person, doing my best with what I've got. Ask me anything.`,
};

const QUESTION_LIMIT = 10;
const LIMIT_REPLY = `That's a good, deep conversation — but I'll cap myself here so Malik can pick this up properly himself. Email him directly at **${siteConfig.email}**, or use the "Let's Talk" button, and mention what we covered.`;

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return null;
    const askedSoFar = messagesRef.current.filter((m) => m.role === "user").length;
    if (askedSoFar >= QUESTION_LIMIT) {
      setMessages((m) => [...m, { role: "user", content }, { role: "assistant", content: LIMIT_REPLY }]);
      return LIMIT_REPLY;
    }
    const next = [...messagesRef.current, { role: "user" as const, content }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      const reply: string = data.reply ?? "Something went wrong.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      return reply;
    } catch {
      const reply = `Network hiccup — try again, or email ${siteConfig.email}.`;
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return <ChatContext.Provider value={{ messages, loading, send }}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within a ChatProvider");
  return ctx;
}
