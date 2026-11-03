import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/src/data/site";
import { ogImage } from "@/src/lib/og";

// The social card, rendered once at build time. A route handler (not the
// opengraph-image convention) so the export writes a real `og.png` file that
// static hosts serve as image/png.
export const dynamic = "force-static";

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
  const [logo, plexSans] = await Promise.all([
    readFile(join(process.cwd(), "public", site.logo.src)),
    loadPlexSans(),
  ]);
  const logoType = site.logo.src.endsWith(".svg") ? "image/svg+xml" : site.logo.src.endsWith(".png") ? "image/png" : "image/jpeg";
  const logoSrc = `data:${logoType};base64,${logo.toString("base64")}`;

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
