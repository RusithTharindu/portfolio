export type Book = {
  id: string;
  title: string;
  author: string;
  /** One line from Rusith on why it stuck. */
  note: string;
  status?: "reading" | "finished";
  /** Front cover under `public/books/`, roughly 2:3. Without it a typographic ink cover is drawn. */
  cover?: { src: string; alt: string };
  /** Spine colour: dark ink with bone lettering, or bone paper with ink lettering. */
  spine?: "ink" | "bone";
  /** Spine thickness in px (a stand-in for page count). Defaults to 36. */
  thickness?: number;
};

export type Bookshelf = {
  items: Book[];
  /** True while these are stand-in entries. Set to false once Rusith adds his own. */
  placeholder: boolean;
};

// placeholder: replace these with real books (covers under public/books/), then set `placeholder: false`.
export const books: Bookshelf = {
  placeholder: true,
  items: [
    {
      id: "book-one",
      title: "Book title",
      author: "Author name",
      note: "placeholder: the book on the nightstand right now",
      status: "reading",
      spine: "bone",
      thickness: 40,
    },
    {
      id: "book-two",
      title: "Another book",
      author: "Author name",
      note: "placeholder: one line on why it stuck",
      spine: "ink",
      thickness: 34,
    },
    {
      id: "book-three",
      title: "A third book",
      author: "Author name",
      note: "placeholder: one line on why it stuck",
      spine: "ink",
      thickness: 46,
    },
    {
      id: "book-four",
      title: "One more",
      author: "Author name",
      note: "placeholder: one line on why it stuck",
      spine: "bone",
      thickness: 30,
    },
    {
      id: "book-five",
      title: "The last one",
      author: "Author name",
      note: "placeholder: one line on why it stuck",
      spine: "ink",
      thickness: 38,
    },
  ],
};

/** The book open on first paint: the one being read, else the first. */
export function initialBookId(items: Book[]): string | null {
  return (items.find((item) => item.status === "reading") ?? items[0])?.id ?? null;
}
