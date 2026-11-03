import { expect, test } from "vitest";
import { getCvHref } from "./site";

test("cv href hidden when null or blank", () => {
  expect(getCvHref({ cvHref: null })).toBeNull();
  expect(getCvHref({ cvHref: "  " })).toBeNull();
  expect(getCvHref({ cvHref: "/cv.pdf" })).toBe("/cv.pdf");
});
