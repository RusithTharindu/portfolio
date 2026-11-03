"use client";

import { motion } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  /** Seconds. */
  delay?: number;
  as?: "div" | "li" | "section";
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
};

const elements = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
} as const;

/**
 * Fades and lifts its content in once, the first time it scrolls into view.
 * Reduced motion keeps only the fade (see MotionProvider); without JS the
 * `data-reveal` noscript rule in the root layout keeps it visible.
 */
export function Reveal({ children, delay = 0, as = "div", ...props }: RevealProps) {
  const Element = elements[as];

  return (
    <Element
      data-reveal=""
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Element>
  );
}
