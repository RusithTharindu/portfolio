import { expect, test } from "vitest";
import { normalizeWeeks, shouldShowCommits, toLevel } from "./github";

test("toLevel maps quartiles", () => {
  expect(
    (
      ["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"] as const
    ).map(toLevel),
  ).toEqual([0, 1, 2, 3, 4]);
});

test("normalizeWeeks keeps the last 53 weeks, indexed from 0", () => {
  const weeks = Array.from({ length: 60 }, (_, w) => ({
    contributionDays: [{ date: `w${w}`, contributionCount: w, contributionLevel: "NONE" as const }],
  }));
  const cells = normalizeWeeks(weeks);
  expect(cells[0]).toMatchObject({ date: "w7", week: 0, weekday: 0 });
  expect(cells.at(-1)).toMatchObject({ date: "w59", week: 52 });
});

test("shouldShowCommits hides fallback only in production", () => {
  expect(shouldShowCommits({ source: "github" }, "production")).toBe(true);
  expect(shouldShowCommits({ source: "fallback" }, "production")).toBe(false);
  expect(shouldShowCommits({ source: "fallback" }, "development")).toBe(true);
});
