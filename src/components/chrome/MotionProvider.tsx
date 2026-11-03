"use client";

import { MotionConfig } from "motion/react";

/**
 * Honours `prefers-reduced-motion` for every motion component: transforms and
 * layout animations are skipped, so only opacity changes remain.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
