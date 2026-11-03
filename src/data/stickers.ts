export type HeroSticker = {
  id: "passport" | "padlock" | "keyboard" | "tea";
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

// Ink sketches arrive later: drop `public/brand/stickers/<id>.png` in and set `src`.
export const stickers: HeroSticker[] = [
  { id: "passport", label: "passport", alt: "Ink sketch of a passport", left: "4%", top: 22, width: 122, height: 92, rotate: -8 },
  { id: "keyboard", label: "keyboard", alt: "Ink sketch of a keyboard", left: "31%", top: 50, width: 160, height: 104, rotate: 3 },
  { id: "padlock", label: "padlock", alt: "Ink sketch of a padlock", left: "74%", top: 10, width: 108, height: 86, rotate: 9 },
  { id: "tea", label: "tea cup", alt: "Ink sketch of a cup of tea", left: "60%", top: 140, width: 90, height: 74, rotate: -5 },
];
