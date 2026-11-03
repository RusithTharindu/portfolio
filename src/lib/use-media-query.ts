"use client";

import { useSyncExternalStore } from "react";

/**
 * Live `matchMedia` result. The server snapshot (and the hydration render) is
 * always `false`, so static HTML and the first client render agree.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True only for a precise pointer (mouse, trackpad) without a reduced-motion preference. */
export function useCanDrag(): boolean {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  return finePointer && !reducedMotion;
}
