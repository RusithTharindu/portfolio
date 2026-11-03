export type NowEntry = {
  label: "building" | "watching" | "playing" | "learning" | "reading";
  value: string;
};

export type Now = {
  /** Month of the last edit, `YYYY-MM`. */
  updated: string;
  entries: NowEntry[];
  /** True while these are stand-in entries. Set to false once Rusith writes his own. */
  placeholder: boolean;
};

// placeholder: replace these entries with your own and set `placeholder: false`.
export const now: Now = {
  updated: "2026-11",
  placeholder: true,
  entries: [
    { label: "building", value: "placeholder: this site, v2, one ink sketch at a time" },
    { label: "watching", value: "placeholder: a seasonal anime" },
    { label: "playing", value: "placeholder: a game on the backlog" },
    { label: "learning", value: "placeholder: threat modelling for the MSc" },
  ],
};
