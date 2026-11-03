"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

type RollingCountProps = {
  value: number;
};

const format = (n: number) => Math.round(n).toLocaleString("en-US");

/**
 * Shows `value`, rolling up from 0 the first time it scrolls into view.
 * The static HTML holds the final number, so it reads correctly without JS.
 */
export function RollingCount({ value }: RollingCountProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!seen || reduceMotion || !node) return;

    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
    });
    return () => {
      controls.stop();
      node.textContent = format(value);
    };
  }, [seen, reduceMotion, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {format(value)}
    </span>
  );
}
