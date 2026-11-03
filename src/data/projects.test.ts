import { expect, test } from "vitest";
import { getFeaturedProjects, groupProjectsByYear, projects } from "./projects";

test("featured: only flagged, newest year first", () => {
  const f = getFeaturedProjects();
  expect(f.length).toBeGreaterThanOrEqual(4);
  expect(f.length).toBeLessThanOrEqual(6);
  expect(f.every((p) => p.featured)).toBe(true);
  expect(f.map((p) => p.year)).toEqual([...f.map((p) => p.year)].sort().reverse());
});

test("groupProjectsByYear groups and orders desc", () => {
  const g = groupProjectsByYear(projects);
  expect(g.map((x) => x.year)).toEqual(["2026", "2025", "2024"]);
  expect(g.flatMap((x) => x.projects)).toHaveLength(projects.length);
});
