"use client";

import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { site } from "@/src/data/site";
import { type HeroSticker, stickers } from "@/src/data/stickers";
import { useCanDrag } from "@/src/lib/use-media-query";

/** Stage width the sticker sizes were designed for (720px column minus 2 × 28px gutters). */
const DESIGN_WIDTH = 664;
/** Smallest scale stickers shrink to on narrow screens. */
const MIN_SCALE = 0.72;

const pop = { type: "spring", stiffness: 260, damping: 16, mass: 0.9 } as const;

/** Width/height that shrink with the stage (container query) but never below MIN_SCALE. */
function fluid(size: number): string {
  return `clamp(${size * MIN_SCALE}px, ${(size / DESIGN_WIDTH) * 100}cqw, ${size}px)`;
}

function placement(left: string, top: number, width: number, height: number): CSSProperties {
  const w = fluid(width);
  return {
    // Keep right-hand stickers inside the stage when it narrows.
    left: `min(${left}, calc(100% - ${w}))`,
    top,
    width: w,
    height: fluid(height),
  };
}

type StickerProps = {
  index: number;
  rotate: number;
  style: CSSProperties;
  draggable: boolean;
  className?: string;
  children: React.ReactNode;
};

function Sticker({ index, rotate, style, draggable, className = "", children }: StickerProps) {
  return (
    <motion.div
      className={`absolute select-none rounded-2xl border-[5px] border-[#f2f0ea] bg-[#050505] shadow-[0_8px_22px_rgba(0,0,0,0.7)] ${
        draggable ? "cursor-grab active:cursor-grabbing" : ""
      } ${className}`}
      style={{ ...style, rotate }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...pop, delay: 0.15 + index * 0.09 }}
      drag={draggable}
      dragSnapToOrigin
      dragElastic={0.6}
      dragTransition={{ bounceStiffness: 320, bounceDamping: 18 }}
      whileHover={draggable ? { scale: 1.05 } : undefined}
      whileDrag={{ scale: 1.08, zIndex: 5 }}
    >
      {children}
    </motion.div>
  );
}

function StickerFace({ sticker }: { sticker: HeroSticker }) {
  if (sticker.src) {
    return (
      // Decorative: the stage is aria-hidden. Local static asset, no optimisation needed.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={sticker.src}
        alt=""
        draggable={false}
        className="pointer-events-none h-full w-full rounded-[11px] object-contain"
      />
    );
  }

  return (
    <span className="grid h-full w-full place-items-center px-2 text-center font-mono text-[10px] leading-tight text-[#8a8a8a]">
      <span className="whitespace-nowrap">
        {sticker.label}
        {sticker.width >= 120 ? <span className="block text-t3">ink sketch</span> : null}
      </span>
    </span>
  );
}

/**
 * Decorative pile of ink stickers. They can be dragged (and spring back) only
 * with a precise pointer, so on touch screens a swipe over them scrolls the page.
 */
export function StickerStage() {
  const draggable = useCanDrag();

  return (
    <div aria-hidden="true" className="relative mt-1.5 h-[230px] [container-type:inline-size]">
      {stickers.map((sticker, index) => (
        <Sticker
          key={sticker.id}
          index={index + 1}
          rotate={sticker.rotate}
          draggable={draggable}
          style={placement(sticker.left, sticker.top, sticker.width, sticker.height)}
        >
          <StickerFace sticker={sticker} />
        </Sticker>
      ))}

      <Sticker
        index={2}
        rotate={-4}
        draggable={draggable}
        className="z-[2] overflow-hidden rounded-[18px]"
        style={placement("5%", 126, 98, 98)}
      >
        <span className="block h-full w-full animate-bob [animation-delay:1.2s]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.logo.src}
            alt=""
            draggable={false}
            className="pointer-events-none h-full w-full object-cover"
          />
        </span>
      </Sticker>

      {draggable ? (
        <span className="pointer-events-none absolute left-[30%] top-[196px] -rotate-[4deg] font-hand text-[15px] text-t3">
          ← drag us around
        </span>
      ) : null}
    </div>
  );
}
