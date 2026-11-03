import { expect, test } from "vitest";
import { formatLocalTime, formatPeriod } from "./time";

test("formatLocalTime uses the given zone, 24h", () => {
  expect(formatLocalTime(new Date("2026-11-03T16:12:00Z"), "Asia/Colombo")).toBe("21:42");
});

test("formatPeriod", () => {
  expect(formatPeriod(2024, null)).toBe("2024 — now");
  expect(formatPeriod(2022, 2024)).toBe("2022 — 24");
  expect(formatPeriod(2024, 2024)).toBe("2024");
});
