"use client";

import { type TransitionEvent, useId, useState } from "react";
import { type Book, initialBookId } from "@/src/data/books";

/** Spine heights cycle through these so the row looks like real books. */
const HEIGHTS = [178, 164, 186, 170, 182, 168];
const DEFAULT_THICKNESS = 36;
/** Front covers are about 2:3. */
const COVER_RATIO = 0.66;

const spineStyles = {
  ink: "border-[#f2f0ea] bg-[#0b0b0b] text-[#f2f0ea]",
  bone: "border-[#0b0b0b] bg-[#ebe7dc] text-[#111]",
} as const;

function Spine({ book, width }: { book: Book; width: number }) {
  const tone = spineStyles[book.spine ?? "ink"];
  return (
    <span
      style={{ width }}
      className={`absolute inset-y-0 left-0 flex flex-col items-center gap-2 overflow-hidden rounded-[3px] border-2 py-2.5 ${tone}`}
    >
      <span className="h-px w-3/5 shrink-0 bg-current opacity-50" />
      <span className="min-h-0 flex-1 overflow-hidden text-[11px] leading-none font-semibold whitespace-nowrap [writing-mode:vertical-rl]">
        {book.title}
      </span>
      <span className="h-px w-3/5 shrink-0 bg-current opacity-50" />
    </span>
  );
}

function Cover({ book, width }: { book: Book; width: number }) {
  if (book.cover) {
    return (
      // Local static cover; next/image adds nothing with unoptimized export images.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={book.cover.src}
        alt=""
        style={{ width }}
        loading="lazy"
        decoding="async"
        className="absolute inset-y-0 left-0 h-full rounded-[3px] object-cover"
      />
    );
  }

  return (
    <span
      style={{ width }}
      className="absolute inset-y-0 left-0 flex flex-col rounded-[3px] border-[3px] border-[#f2f0ea] bg-black p-3 text-left"
    >
      <span className="text-[14px] leading-tight font-semibold text-[#f2f0ea]">{book.title}</span>
      <span className="mt-auto font-mono text-[10px] text-t3">{book.author}</span>
    </span>
  );
}

type BookshelfProps = {
  items: Book[];
};

/**
 * Books stand spine-out on a shelf; picking one turns it to show its cover and
 * the note below. The open book is chosen on the server too, so the static
 * HTML (and the page without JS) shows a cover and its note.
 */
export function Bookshelf({ items }: BookshelfProps) {
  const [openId, setOpenId] = useState(() => initialBookId(items));
  const detailId = useId();
  const open = items.find((book) => book.id === openId) ?? null;

  const onOpened = (event: TransitionEvent<HTMLButtonElement>) => {
    if (event.propertyName !== "width" || event.currentTarget.getAttribute("aria-pressed") !== "true") return;
    event.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  };

  return (
    <>
      <div className="scrollbar-none overflow-x-auto overscroll-x-contain">
        <div className="w-max min-w-full px-4 pt-6 xs:px-7">
          <ul aria-label="Books" className="flex items-end gap-1.5">
            {items.map((book, index) => {
              const height = HEIGHTS[index % HEIGHTS.length];
              const thickness = book.thickness ?? DEFAULT_THICKNESS;
              const coverWidth = Math.round(height * COVER_RATIO);
              const active = book.id === openId;

              return (
                <li key={book.id} className="flex">
                  <button
                    type="button"
                    aria-pressed={active}
                    aria-controls={detailId}
                    onClick={() => setOpenId(book.id)}
                    onTransitionEnd={onOpened}
                    style={{ height, width: active ? coverWidth : thickness }}
                    className="relative block shrink-0 rounded-[3px] shadow-[0_6px_14px_rgba(0,0,0,0.55)] transition-[width,translate] duration-500 ease-soft aria-[pressed=false]:hover:-translate-y-1.5 aria-[pressed=false]:focus-visible:-translate-y-1.5"
                  >
                    <span aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[3px]">
                      <span
                        className={`absolute inset-0 transition-opacity duration-300 ${active ? "opacity-0" : "opacity-100"}`}
                      >
                        <Spine book={book} width={thickness} />
                      </span>
                      <span
                        className={`absolute inset-0 transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"}`}
                      >
                        <Cover book={book} width={coverWidth} />
                      </span>
                    </span>
                    <span className="sr-only">
                      {book.title} by {book.author}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {/* The shelf board the books stand on. */}
          <div aria-hidden="true" className="h-[3px] rounded-full bg-[#2a2a2a] shadow-[0_6px_12px_rgba(0,0,0,0.6)]" />
        </div>
      </div>

      <div id={detailId} aria-live="polite" className="min-h-[92px] px-4 pt-4 pb-5 xs:px-7">
        {open ? (
          <div key={open.id} className="animate-rise">
            <p className="flex flex-wrap items-baseline gap-x-2.5">
              <span className="font-medium text-t1">{open.title}</span>
              <span className="font-mono text-[12px] text-t3">{open.author}</span>
              {open.status === "reading" ? (
                <span className="rounded bg-acc-dim px-1.5 py-px font-mono text-[10px] text-acc">
                  reading now
                </span>
              ) : null}
            </p>
            <p className="mt-1 text-t2">{open.note}</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
