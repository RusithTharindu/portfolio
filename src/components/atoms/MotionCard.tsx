"use client";

import { motion, type Variants } from "motion/react";

type MotionCardProps = {
  children: React.ReactNode;
  className: string;
  id?: string;
  delay?: number;
  skipEntranceAnimation?: boolean;
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay,
      duration: 0.7,
      ease: [0.2, 0.8, 0.2, 1],
    },
  }),
};

export function MotionCard({
  children,
  className,
  id,
  delay = 0,
  skipEntranceAnimation = false,
}: MotionCardProps) {
  return (
    <motion.section
      className={className}
      custom={delay}
      id={id}
      initial={skipEntranceAnimation ? false : "hidden"}
      animate="visible"
      variants={cardVariants}
      whileHover={{
        y: -2,
        transition: {
          duration: 0.35,
          ease: [0.2, 0.8, 0.2, 1],
        },
      }}
    >
      {children}
    </motion.section>
  );
}
