"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { type SectionLink, sectionHref } from "@/src/components/chrome/sections";

type MenuPillProps = {
  sections: SectionLink[];
  cvHref: string | null;
};

const itemClass =
  "block rounded-[10px] px-3 py-2.5 text-[13.5px] text-t1 first-letter:uppercase outline-offset-[-2px] transition-colors hover:bg-[#1f1f1f] focus-visible:bg-[#1f1f1f]";

/** Floating "Menu" button at the bottom centre that opens a sheet of section links. */
export function MenuPill({ sections, cvHref }: MenuPillProps) {
  const [open, setOpen] = useState(false);
  const sheetId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (sheetRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="fixed bottom-[max(18px,env(safe-area-inset-bottom))] left-1/2 z-[15] -translate-x-1/2">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={sheetId}
        onClick={() => setOpen((value) => !value)}
        className="rounded-full bg-[#f1f1f1] px-[15px] py-[7px] text-[12px] font-medium text-[#111] shadow-[0_6px_20px_rgba(0,0,0,0.6)] transition-transform duration-200 active:scale-[0.94]"
      >
        Menu
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={sheetRef}
            id={sheetId}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className="absolute bottom-[calc(100%+12px)] left-1/2 w-[min(320px,calc(100vw-32px))] -translate-x-1/2 origin-bottom"
          >
            <nav
              aria-label="Menu"
              className="rounded-2xl border border-[#2a2a2a] bg-[#151515] p-2 shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
            >
              <ul>
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={sectionHref(section)} onClick={close} className={itemClass}>
                      {section.label}
                    </a>
                  </li>
                ))}
                {cvHref ? (
                  <li>
                    <a href={cvHref} onClick={close} className={itemClass}>
                      Download CV
                    </a>
                  </li>
                ) : null}
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
