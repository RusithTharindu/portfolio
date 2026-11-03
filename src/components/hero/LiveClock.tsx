"use client";

import { useSyncExternalStore } from "react";
import { formatLocalTime } from "@/src/lib/time";

const PLACEHOLDER = "--:--";
const TICK_MS = 30_000;

function subscribe(onTick: () => void) {
  const id = window.setInterval(onTick, TICK_MS);
  return () => window.clearInterval(id);
}

type LiveClockProps = {
  timeZone: string;
};

/**
 * Local time in `timeZone`. The static HTML was rendered at build time, so the
 * server snapshot is a placeholder and the real time fills in after hydration.
 */
export function LiveClock({ timeZone }: LiveClockProps) {
  const time = useSyncExternalStore(
    subscribe,
    () => formatLocalTime(new Date(), timeZone),
    () => PLACEHOLDER,
  );

  return (
    <time className="tabular-nums" dateTime={time === PLACEHOLDER ? undefined : time}>
      {time}
    </time>
  );
}
