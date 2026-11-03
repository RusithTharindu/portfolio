"use client";

import { motion, useReducedMotion } from "motion/react";

type BrushUnderlineProps = {
  children: React.ReactNode;
};

/** An amber brush stroke that draws itself under its children after the headline lands. */
export function BrushUnderline({ children }: BrushUnderlineProps) {
  const reduceMotion = useReducedMotion();

  return (
    <span className="relative inline-block">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-2 -left-[3%] h-3 w-[106%] overflow-visible"
      >
        <motion.path
          data-draw=""
          d="M3 8 C 40 3, 90 10, 130 5 S 185 7, 197 4"
          fill="none"
          stroke="var(--color-acc)"
          strokeWidth={3.2}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={
            reduceMotion ? { duration: 0 } : { duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }
          }
        />
      </svg>
    </span>
  );
}
