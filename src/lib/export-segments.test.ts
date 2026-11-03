import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vitest";
import { flatSegmentName, flattenExportSegments } from "../../scripts/flatten-export-segments.mjs";

test("flatSegmentName joins the segment folder and nested path with dots", () => {
  expect(flatSegmentName("__next.projects", "__PAGE__.txt")).toBe("__next.projects.__PAGE__.txt");
  expect(flatSegmentName("__next.projects", "$d$slug/__PAGE__.txt")).toBe(
    "__next.projects.$d$slug.__PAGE__.txt",
  );
  expect(flatSegmentName("__next.projects", "$d$slug.txt")).toBe("__next.projects.$d$slug.txt");
});

test("flattenExportSegments copies nested segment files next to their folder", () => {
  const out = mkdtempSync(join(tmpdir(), "export-"));
  mkdirSync(join(out, "projects", "passgo", "__next.projects", "$d$slug"), { recursive: true });
  writeFileSync(join(out, "projects", "passgo", "__next.projects", "$d$slug", "__PAGE__.txt"), "page");
  writeFileSync(join(out, "projects", "passgo", "__next.projects", "$d$slug.txt"), "layout");
  writeFileSync(join(out, "projects", "__next.projects.txt"), "already flat");

  const written = flattenExportSegments(out);

  expect(written).toBe(2);
  expect(
    readFileSync(join(out, "projects", "passgo", "__next.projects.$d$slug.__PAGE__.txt"), "utf8"),
  ).toBe("page");
  expect(readFileSync(join(out, "projects", "passgo", "__next.projects.$d$slug.txt"), "utf8")).toBe(
    "layout",
  );
});
