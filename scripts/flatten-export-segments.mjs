// Next 16's static export writes route-segment prefetch files into nested
// folders (out/projects/__next.projects/__PAGE__.txt), while the client router
// requests them as flat names (out/projects/__next.projects.__PAGE__.txt).
// Static hosts such as GitHub Pages then answer every prefetch with a 404.
// This post-export step writes a flat copy of each nested segment file.
//
// Usage: node scripts/flatten-export-segments.mjs [outDir]

import { copyFileSync, existsSync, readdirSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

const SEGMENT_PREFIX = "__next.";

/**
 * Flat file name for a file nested inside a segment folder.
 * @param {string} segmentDir folder name, e.g. "__next.projects"
 * @param {string} nestedPath path inside it, e.g. "$d$slug/__PAGE__.txt"
 * @returns {string}
 */
export function flatSegmentName(segmentDir, nestedPath) {
  return `${segmentDir}.${nestedPath.split(/[\\/]/).join(".")}`;
}

/** @param {string} dir @returns {string[]} */
function filesUnder(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? filesUnder(full) : [full];
  });
}

/**
 * Copies every file inside `__next.*` folders under `outDir` to its flat name
 * beside the folder.
 * @param {string} outDir
 * @returns {number} files written
 */
export function flattenExportSegments(outDir) {
  let written = 0;

  /** @param {string} dir */
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const full = join(dir, entry.name);

      if (entry.name.startsWith(SEGMENT_PREFIX)) {
        for (const file of filesUnder(full)) {
          const nested = relative(full, file).split(sep).join("/");
          copyFileSync(file, join(dir, flatSegmentName(entry.name, nested)));
          written += 1;
        }
      } else {
        walk(full);
      }
    }
  };

  walk(outDir);
  return written;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const outDir = resolve(process.argv[2] ?? "out");
  if (!existsSync(outDir)) {
    console.error(`flatten-export-segments: ${outDir} does not exist; run next build first.`);
    process.exit(1);
  }
  console.log(`flatten-export-segments: wrote ${flattenExportSegments(outDir)} flat segment files.`);
}
