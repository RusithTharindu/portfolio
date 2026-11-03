"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useSyncExternalStore } from "react";
import { type SectionLink, sectionHref } from "@/src/components/chrome/sections";

const spring = { stiffness: 260, damping: 30, mass: 0.8 };

/** Re-renders subscribers at most once per frame while the page scrolls or resizes. */
function subscribe(onChange: () => void) {
  let frame = 0;
  const schedule = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      onChange();
    });
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  return () => {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    window.cancelAnimationFrame(frame);
  };
}

/** Index of the section whose centre is nearest the viewport centre. */
function nearestSection(ids: string[]): number {
  const middle = window.innerHeight / 2;
  let best = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  ids.forEach((id, index) => {
    const rect = document.getElementById(id)?.getBoundingClientRect();
    if (!rect) return;
    const distance = Math.abs((rect.top + rect.bottom) / 2 - middle);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = index;
    }
  });
  return best;
}

type TickProps = {
  state: "active" | "near" | "idle";
};

function Tick({ state }: TickProps) {
  const reduceMotion = useReducedMotion();
  const target = state === "active" ? 1.9 : state === "near" ? 1.35 : 1;
  const scaleX = useSpring(target, spring);

  useEffect(() => {
    if (reduceMotion) scaleX.jump(target);
    else scaleX.set(target);
  }, [reduceMotion, scaleX, target]);

  return (
    <motion.span
      aria-hidden="true"
      style={{ scaleX }}
      className={`block h-0.5 w-[22px] origin-left rounded-sm transition-colors duration-300 ${
        state === "active" ? "bg-acc" : state === "near" ? "bg-[#555]" : "bg-[#333]"
      }`}
    />
  );
}

type SectionRailProps = {
  sections: SectionLink[];
};

/** Desktop-only tick rail left of the column that tracks the section in view. */
export function SectionRail({ sections }: SectionRailProps) {
  const ids = sections.map((section) => section.id);
  const active = useSyncExternalStore(
    subscribe,
    () => nearestSection(ids),
    () => 0,
  );

  return (
    <nav
      aria-label="Page sections"
      className="fixed top-1/2 left-[max(16px,calc(50%-480px))] z-[6] hidden -translate-y-1/2 min-[1100px]:block"
    >
      <ul className="flex flex-col gap-[9px]">
        {sections.map((section, index) => {
          const isActive = index === active;
          const state = isActive ? "active" : Math.abs(index - active) === 1 ? "near" : "idle";
          return (
            <li key={section.id}>
              <a
                href={sectionHref(section)}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center gap-2.5 rounded-sm py-0.5"
              >
                <Tick state={state} />
                <span
                  className={`font-mono text-[10.5px] text-t3 transition duration-200 ${
                    isActive
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                  }`}
                >
                  {section.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
