import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/src/data/site";
import type { HeroSticker } from "@/src/data/stickers";
import { ogImage } from "@/src/lib/og";

// The social card, rendered once at build time. A route handler (not the
// opengraph-image convention) so the export writes a real `og.png` file that
// static hosts serve as image/png.
export const dynamic = "force-static";

type OgSticker = {
  id: HeroSticker["id"];
  /** PNG copy under `public/` (Satori cannot read WebP), trimmed to the sticker's edge. */
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  /** Degrees. */
  rotate: number;
};

// Tucked into the corners around the logo and name; width/height follow each PNG's aspect ratio.
const ogStickers: OgSticker[] = [
  { id: "book", src: "/brand/stickers/og/book.png", left: 44, top: 34, width: 156, height: 126, rotate: -10 },
  { id: "gameboy", src: "/brand/stickers/og/gameboy-controller.png", left: 1046, top: 30, width: 108, height: 117, rotate: 10 },
  { id: "keyboard", src: "/brand/stickers/og/keyboard.png", left: 846, top: 448, width: 258, height: 156, rotate: -4 },
  { id: "coffee", src: "/brand/stickers/og/coffee-cup.png", left: 150, top: 466, width: 118, height: 115, rotate: 6 },
];

/** Reads a file under `public/` as a data URI for Satori. */
async function publicDataUri(src: string): Promise<string> {
  const file = await readFile(join(process.cwd(), "public", src));
  const type = src.endsWith(".svg") ? "image/svg+xml" : src.endsWith(".png") ? "image/png" : "image/jpeg";
  return `data:${type};base64,${file.toString("base64")}`;
}

/** IBM Plex Sans 600 as TTF (Satori cannot read woff2). Falls back to the default font offline. */
async function loadPlexSans(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@600", {
      signal: AbortSignal.timeout(8_000),
    }).then((response) => (response.ok ? response.text() : ""));
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    const font = await fetch(url, { signal: AbortSignal.timeout(8_000) });
    return font.ok ? await font.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export async function GET() {
  const [logoSrc, stickerSrcs, plexSans] = await Promise.all([
    publicDataUri(site.logo.ogSrc),
    Promise.all(ogStickers.map((sticker) => publicDataUri(sticker.src))),
    loadPlexSans(),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: "0 96px",
          backgroundColor: "#090909",
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent 0 7px, #111111 7px 8px)",
          color: "#ededed",
          fontFamily: plexSans ? "IBM Plex Sans" : undefined,
        }}
      >
        {ogStickers.map((sticker, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={sticker.id}
            src={stickerSrcs[index]}
            width={sticker.width}
            height={sticker.height}
            alt=""
            style={{
              position: "absolute",
              left: sticker.left,
              top: sticker.top,
              transform: `rotate(${sticker.rotate}deg)`,
              filter: "drop-shadow(0 10px 14px rgba(0, 0, 0, 0.65))",
            }}
          />
        ))}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          width={220}
          height={220}
          alt=""
          style={{ borderRadius: 40, border: "6px solid #f2f0ea" }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 600, letterSpacing: "-0.02em" }}>{site.name}</div>
          <div style={{ display: "flex", fontSize: 32, color: "#a3a3a3" }}>
            {site.role} at {site.company.name}
          </div>
          <div style={{ display: "flex", width: 220, height: 6, borderRadius: 6, backgroundColor: "#e0a458" }} />
        </div>
      </div>
    ),
    {
      width: ogImage.width,
      height: ogImage.height,
      fonts: plexSans ? [{ name: "IBM Plex Sans", data: plexSans, weight: 600, style: "normal" }] : undefined,
    },
  );
}
