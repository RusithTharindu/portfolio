import { site } from "@/src/data/site";

export type MediumPost = {
  title: string;
  href: string;
  /** ISO date, `YYYY-MM-DD`. */
  publishedAt: string;
};

const namedEntities: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (entity[0] === "#") {
      const code =
        entity[1].toLowerCase() === "x"
          ? Number.parseInt(entity.slice(2), 16)
          : Number.parseInt(entity.slice(1), 10);
      return Number.isFinite(code) && code <= 0x10ffff ? String.fromCodePoint(code) : match;
    }
    return namedEntities[entity.toLowerCase()] ?? match;
  });
}

const tagPatterns = {
  title: /<title(?:\s[^>]*)?>([\s\S]*?)<\/title>/i,
  link: /<link(?:\s[^>]*)?>([\s\S]*?)<\/link>/i,
  pubDate: /<pubDate(?:\s[^>]*)?>([\s\S]*?)<\/pubDate>/i,
} as const;

function readTag(block: string, tag: keyof typeof tagPatterns): string | null {
  const match = block.match(tagPatterns[tag]);
  if (!match) return null;
  const raw = match[1].trim();
  const cdata = raw.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return decodeEntities(cdata ? cdata[1] : raw).trim();
}

function cleanUrl(href: string): string | null {
  try {
    const url = new URL(href);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return `${url.origin}${url.pathname}`;
  } catch {
    return null;
  }
}

/** Parses a Medium RSS feed. Items without a title, a valid link or a valid date are dropped. */
export function parseMediumFeed(xml: string): MediumPost[] {
  const posts: MediumPost[] = [];

  for (const [, block] of xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)) {
    const title = readTag(block, "title");
    const link = readTag(block, "link");
    const pubDate = readTag(block, "pubDate");
    const href = link ? cleanUrl(link) : null;
    const date = pubDate ? new Date(pubDate) : null;

    if (!title || !href || !date || Number.isNaN(date.getTime())) continue;

    posts.push({ title, href, publishedAt: date.toISOString().slice(0, 10) });
  }

  return posts;
}

/** Latest posts from Medium at build time. Any failure yields `[]` so the section hides. */
export async function getMediumPosts(limit = 3): Promise<MediumPost[]> {
  try {
    const response = await fetch(site.mediumFeedUrl, {
      headers: { Accept: "application/rss+xml, application/xml;q=0.9, */*;q=0.1" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return [];
    return parseMediumFeed(await response.text()).slice(0, limit);
  } catch {
    return [];
  }
}
