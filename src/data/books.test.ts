import { expect, test } from "vitest";
import { type Book, books, initialBookId } from "./books";

const book = (id: string, status?: Book["status"]): Book => ({
  id,
  title: id,
  author: "someone",
  note: "a note",
  status,
});

test("initialBookId opens the book being read, else the first, else none", () => {
  expect(initialBookId([book("a", "finished"), book("b", "reading"), book("c", "reading")])).toBe("b");
  expect(initialBookId([book("a"), book("b")])).toBe("a");
  expect(initialBookId([])).toBeNull();
});

test("book ids are unique", () => {
  const ids = books.items.map((item) => item.id);
  expect(new Set(ids).size).toBe(ids.length);
});
