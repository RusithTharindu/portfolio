import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, test } from "vitest";
import { clearFetchCache } from "../../scripts/clear-fetch-cache.mjs";

const dirs: string[] = [];

afterEach(() => {
  for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true });
});

test("clearFetchCache removes cached build-time fetches and keeps the rest of the cache", () => {
  const root = mkdtempSync(join(tmpdir(), "next-cache-"));
  dirs.push(root);
  mkdirSync(join(root, ".next", "cache", "fetch-cache"), { recursive: true });
  mkdirSync(join(root, ".next", "cache", "images"), { recursive: true });
  writeFileSync(join(root, ".next", "cache", "fetch-cache", "33da7a69"), "{}");
  writeFileSync(join(root, ".next", "cache", "images", "keep"), "x");

  expect(clearFetchCache(root)).toBe(true);
  expect(existsSync(join(root, ".next", "cache", "fetch-cache"))).toBe(false);
  expect(existsSync(join(root, ".next", "cache", "images", "keep"))).toBe(true);
});

test("clearFetchCache is a no-op when there is no cache yet", () => {
  const root = mkdtempSync(join(tmpdir(), "next-cache-"));
  dirs.push(root);
  expect(clearFetchCache(root)).toBe(false);
});
