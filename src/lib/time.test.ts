import { expect, test } from "vitest";
import { formatDay, formatLocalTime, formatMonth, formatPeriod } from "./time";

test("formatMonth turns YYYY-MM into a short month and year", () => {
  expect(formatMonth("2026-11")).toBe("Nov 2026");
  expect(formatMonth("2026-01")).toBe("Jan 2026");
});

test("formatDay turns an ISO date into day, short month, year", () => {
  expect(formatDay("2025-10-14")).toBe("14 Oct 2025");
  expect(formatDay("2025-09-01")).toBe("1 Sep 2025");
});

test("formatLocalTime uses the given zone, 24h", () => {
  expect(formatLocalTime(new Date("2026-11-03T16:12:00Z"), "Asia/Colombo")).toBe("21:42");
});

test("formatPeriod", () => {
  expect(formatPeriod(2024, null)).toBe("2024 — now");
  expect(formatPeriod(2022, 2024)).toBe("2022 — 24");
  expect(formatPeriod(2024, 2024)).toBe("2024");
});
