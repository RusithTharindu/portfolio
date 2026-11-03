// Next 16 caches fetches made while prerendering in .next/cache/fetch-cache for
// a year, and later builds (including CI, which restores .next/cache) read them
// back instead of fetching. The Medium feed and GitHub contributions must be
// fresh on every build, so the build starts by dropping that cache.
//
// Usage: node scripts/clear-fetch-cache.mjs [projectRoot]

import { existsSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

/**
 * Removes `<root>/.next/cache/fetch-cache`.
 * @param {string} root project root
 * @returns {boolean} whether a cache was removed
 */
export function clearFetchCache(root) {
  const dir = join(root, ".next", "cache", "fetch-cache");
  if (!existsSync(dir)) return false;
  rmSync(dir, { recursive: true, force: true });
  return true;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const cleared = clearFetchCache(resolve(process.argv[2] ?? "."));
  console.log(`clear-fetch-cache: ${cleared ? "cleared" : "nothing to clear"}.`);
}
