import { afterEach, expect, test, vi } from "vitest";
import { getMediumPosts, parseMediumFeed } from "./medium";

const xml = `<rss><channel>
<item><title><![CDATA[Building PassGo &amp; what OCR taught me]]></title>
<link>https://medium.com/@devrusith/passgo-123?source=rss-abc------2</link>
<pubDate>Tue, 14 Oct 2025 09:12:00 GMT</pubDate></item>
<item><title>Rusith&#8217;s notes</title><link>https://medium.com/@devrusith/notes-9</link>
<pubDate>Mon, 01 Sep 2025 00:00:00 GMT</pubDate></item>
</channel></rss>`;

afterEach(() => {
  vi.unstubAllGlobals();
});

test("parses items, decodes entities, strips query", () => {
  expect(parseMediumFeed(xml)).toEqual([
    {
      title: "Building PassGo & what OCR taught me",
      href: "https://medium.com/@devrusith/passgo-123",
      publishedAt: "2025-10-14",
    },
    {
      title: "Rusith’s notes",
      href: "https://medium.com/@devrusith/notes-9",
      publishedAt: "2025-09-01",
    },
  ]);
});

test("empty or garbage feed -> []", () => {
  expect(parseMediumFeed("")).toEqual([]);
  expect(parseMediumFeed("<html>503</html>")).toEqual([]);
});

test("skips items missing title or link", () => {
  expect(parseMediumFeed("<rss><item><title>x</title></item></rss>")).toEqual([]);
});

test("getMediumPosts returns [] when fetch rejects or is non-200", async () => {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("down")));
  expect(await getMediumPosts()).toEqual([]);
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("nope", { status: 500 })));
  expect(await getMediumPosts()).toEqual([]);
});

test("getMediumPosts respects limit", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(xml)));
  expect(await getMediumPosts(1)).toHaveLength(1);
});
