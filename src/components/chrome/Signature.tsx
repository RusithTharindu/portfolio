"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Placeholder "Rusith" signature that draws itself once when scrolled into view.
 * Swap `SIGNATURE_PATH` (and the viewBox) for the real hand-drawn SVG later.
 */
const SIGNATURE_PATH =
  "M8 52 C 14 30, 20 14, 26 12 C 34 10, 36 26, 26 32 C 20 36, 30 40, 42 54 M48 38 C 46 46, 50 52, 56 46 C 60 40, 60 36, 60 36 C 60 44, 62 52, 68 46 M76 36 C 70 36, 70 44, 78 46 C 86 48, 80 56, 72 54 M92 34 L 90 52 M92 24 L 92 25 M104 18 C 102 34, 100 46, 102 54 M96 34 L 112 32 M118 16 C 116 32, 114 46, 116 54 C 118 42, 124 36, 130 40 C 134 44, 132 52, 136 54 C 150 56, 168 46, 182 40";

export function Signature() {
  const reduceMotion = useReducedMotion();

  return (
    <svg aria-hidden="true" width="190" height="70" viewBox="0 0 190 70" className="max-w-full">
      <motion.path
        data-draw=""
        d={SIGNATURE_PATH}
        fill="none"
        stroke="var(--color-t1)"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 2.2, ease: "easeInOut" }}
      />
    </svg>
  );
}
