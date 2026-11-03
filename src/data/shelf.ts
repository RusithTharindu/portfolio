export type ShelfItem = {
  title: string;
  kind: "anime" | "manga" | "game";
  note: string;
  /** Local image under `public/`, 2:3 portrait. Without it a typographic ink tile is drawn. */
  cover?: { src: string; alt: string };
};

export type Shelf = {
  items: ShelfItem[];
  /** True while these are stand-in entries. Set to false once Rusith adds his own. */
  placeholder: boolean;
};

// placeholder: replace these items with your own (and covers under public/shelf/), then set `placeholder: false`.
export const shelf: Shelf = {
  placeholder: true,
  items: [
    { title: "Anime title", kind: "anime", note: "placeholder: one line on why it stuck" },
    { title: "Manga title", kind: "manga", note: "placeholder: one line on why it stuck" },
    { title: "Game title", kind: "game", note: "placeholder: one line on why it stuck" },
    { title: "Another game", kind: "game", note: "placeholder: one line on why it stuck" },
  ],
};
