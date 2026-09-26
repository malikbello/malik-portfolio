import { NextResponse } from "next/server";

export const runtime = "nodejs";

type NewsItem = { title: string; link: string; source: string; date: string };

const FEEDS: { url: string; source: string }[] = [
  { url: "https://news.mit.edu/rss/topic/artificial-intelligence2", source: "MIT News" },
  { url: "https://towardsdatascience.com/feed", source: "Towards Data Science" },
  { url: "https://www.technologyreview.com/topic/artificial-intelligence/feed", source: "MIT Tech Review" },
  { url: "https://blog.google/technology/ai/rss/", source: "Google AI" },
  { url: "https://huggingface.co/blog/feed.xml", source: "Hugging Face" },
];

function decodeEntities(str: string) {
  return str
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    // &amp; last: decoding it first would turn "&amp;lt;" into "<" (CodeQL js/double-escaping)
    .replace(/&amp;/g, "&")
    .trim();
}

function parseFeed(xml: string, source: string): NewsItem[] {
  const items: NewsItem[] = [];
  const blocks = xml.match(/<item[\s\S]*?<\/item>|<entry[\s\S]*?<\/entry>/g) ?? [];
  for (const block of blocks.slice(0, 6)) {
    const title = block.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1];
    const linkTag = block.match(/<link[^>]*>([\s\S]*?)<\/link>/)?.[1];
    const linkHref = block.match(/<link[^>]*href=["']([^"']+)["']/)?.[1];
    const date =
      block.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/)?.[1] ??
      block.match(/<published[^>]*>([\s\S]*?)<\/published>/)?.[1] ??
      block.match(/<updated[^>]*>([\s\S]*?)<\/updated>/)?.[1] ??
      "";
    const link = (linkHref ?? linkTag ?? "").trim();
    if (!title || !link) continue;
    items.push({ title: decodeEntities(title), link, source, date: date.trim() });
  }
  return items;
}

export async function GET() {
  const results = await Promise.allSettled(
    FEEDS.map(async ({ url, source }) => {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; MalikPortfolioBot/1.0)" },
        next: { revalidate: 300 },
      });
      if (!res.ok) throw new Error(`${source} feed failed`);
      const xml = await res.text();
      return parseFeed(xml, source);
    })
  );

  const items = results
    .filter((r): r is PromiseFulfilledResult<NewsItem[]> => r.status === "fulfilled")
    .flatMap((r) => r.value)
    .filter((item) => item.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  return NextResponse.json(
    { items },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900" } }
  );
}
