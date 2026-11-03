/** Wall-clock time in `timeZone` as 24-hour "HH:mm". */
export function formatLocalTime(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

/** "2024 — now", "2022 — 24", or "2024" when start and end are the same year. */
export function formatPeriod(start: number, end: number | null): string {
  if (end === null) return `${start} — now`;
  if (end === start) return `${start}`;
  return `${start} — ${String(end).slice(-2)}`;
}
