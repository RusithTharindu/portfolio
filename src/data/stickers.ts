export type HeroSticker = {
  id: "book" | "keyboard" | "gameboy" | "coffee";
  /** Shown in the placeholder tile until `src` is set. */
  label: string;
  /** Ink sketch under `public/brand/stickers/`. */
  src?: string;
  alt: string;
  /** CSS length from the stage's left edge, e.g. "31%". */
  left: string;
  top: number;
  width: number;
  height: number;
  /** Degrees. */
  rotate: number;
};

// Cut-out stickers with their own white edge; width/height follow each image's aspect ratio.
export const stickers: HeroSticker[] = [
  { id: "book", label: "book", src: "/brand/stickers/book.webp", alt: "Brush sketch of a red book with a ribbon bookmark", left: "3%", top: 16, width: 132, height: 106, rotate: -8 },
  { id: "keyboard", label: "keyboard", src: "/brand/stickers/keyboard.webp", alt: "Brush sketch of a black and red mechanical keyboard", left: "30%", top: 44, width: 174, height: 116, rotate: 3 },
  { id: "gameboy", label: "game boy", src: "/brand/stickers/gameboy-controller.webp", alt: "Brush sketch of a Game Boy", left: "76%", top: 4, width: 98, height: 102, rotate: 9 },
  { id: "coffee", label: "coffee cup", src: "/brand/stickers/coffee-cup.webp", alt: "Brush sketch of a steaming coffee cup", left: "60%", top: 126, width: 94, height: 96, rotate: -5 },
];
