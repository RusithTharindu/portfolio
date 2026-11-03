"use client";

import { type RefObject, useEffect, useRef } from "react";

type RevealGroupProps = {
  children: React.ReactNode;
  as?: "div" | "section";
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
};

/** Gap between rows that come into view together. */
const STEP_MS = 70;
/** Longest wait for a single row, so long lists never feel slow. */
const MAX_DELAY_MS = 420;

/**
 * Fades and lifts each `[data-reveal-item]` row inside it the first time that row
 * scrolls into view; rows that arrive together are staggered top to bottom.
 *
 * Rows start hidden from the first paint (globals.css), so rows already on
 * screen cascade in after hydration instead of flashing. They are shown without
 * JS (the noscript rule in app/layout.tsx) and with reduced motion (CSS).
 */
export function RevealGroup({ children, as = "div", ...props }: RevealGroupProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const items = [...node.querySelectorAll<HTMLElement>("[data-reveal-item]")];
    // A separate flag React never renders, so a re-render can't hide a row again.
    const show = (item: HTMLElement) => {
      item.dataset.revealed = "";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          .forEach((entry, index) => {
            const item = entry.target as HTMLElement;
            item.style.transitionDelay = `${Math.min(index * STEP_MS, MAX_DELAY_MS)}ms`;
            show(item);
            observer.unobserve(item);
          });
      },
      { rootMargin: "0px 0px -32px 0px" },
    );
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  if (as === "section") {
    return (
      <section ref={ref} {...props}>
        {children}
      </section>
    );
  }
  return (
    <div ref={ref as RefObject<HTMLDivElement | null>} {...props}>
      {children}
    </div>
  );
}
