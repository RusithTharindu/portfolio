"use client";

import { type RefObject, useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
  /** Seconds. */
  delay?: number;
  as?: "div" | "li" | "section";
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
};

/**
 * Fades and lifts its content in once, the first time it scrolls into view.
 *
 * The static HTML is always visible: only blocks that start below the fold are
 * hidden after hydration (`data-reveal="pending"`), so above-the-fold content
 * paints immediately, and nothing is hidden without JS or with reduced motion.
 * The transition itself lives in globals.css.
 */
export function Reveal({ children, delay = 0, as = "div", ...props }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    node.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        node.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      node.dataset.reveal = "";
    };
  }, []);

  const shared = {
    "data-reveal": "",
    style: delay ? { transitionDelay: `${delay}s` } : undefined,
    ...props,
  };

  if (as === "section") {
    return (
      <section ref={ref} {...shared}>
        {children}
      </section>
    );
  }
  if (as === "li") {
    return (
      <li ref={ref as RefObject<HTMLLIElement | null>} {...shared}>
        {children}
      </li>
    );
  }
  return (
    <div ref={ref as RefObject<HTMLDivElement | null>} {...shared}>
      {children}
    </div>
  );
}
