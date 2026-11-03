/** Wall-clock time in `timeZone` as 24-hour "HH:mm". */
export function formatLocalTime(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-11" → "Nov 2026". */
export function formatMonth(yearMonth: string): string {
  const [year, month] = yearMonth.split("-");
  return `${MONTHS[Number(month) - 1] ?? month} ${year}`;
}

/** "2025-10-14" → "14 Oct 2025". Parsed by hand so the build machine's zone cannot shift the day. */
export function formatDay(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${Number(day)} ${MONTHS[Number(month) - 1] ?? month} ${year}`;
}

/** "2024 — now", "2022 — 24", or "2024" when start and end are the same year. */
export function formatPeriod(start: number, end: number | null): string {
  if (end === null) return `${start} — now`;
  if (end === start) return `${start}`;
  return `${start} — ${String(end).slice(-2)}`;
}
