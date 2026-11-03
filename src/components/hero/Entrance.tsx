"use client";

import { motion } from "motion/react";

type EntranceProps = {
  children: React.ReactNode;
  /** Position in the hero stagger; each step adds 90ms. */
  step: number;
  as?: "div" | "p" | "h1";
  className?: string;
  id?: string;
};

const elements = {
  div: motion.div,
  p: motion.p,
  h1: motion.h1,
} as const;

/** Hero text entrance: fade, small rise and a blur that clears, staggered by `step`. */
export function Entrance({ children, step, as = "div", ...props }: EntranceProps) {
  const Element = elements[as];

  return (
    <Element
      data-reveal=""
      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay: 0.15 + step * 0.09, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Element>
  );
}
