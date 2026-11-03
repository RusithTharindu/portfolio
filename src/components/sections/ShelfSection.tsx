import { Band } from "@/src/components/chrome/Band";
import { Reveal } from "@/src/components/chrome/Reveal";
import { type ShelfItem, shelf } from "@/src/data/shelf";

function Cover({ item }: { item: ShelfItem }) {
  if (item.cover) {
    return (
      // Local static cover; next/image adds nothing with unoptimized export images.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.cover.src}
        alt={item.cover.alt}
        width={120}
        height={180}
        loading="lazy"
        decoding="async"
        className="aspect-[2/3] w-full rounded-lg border border-[#242424] bg-black object-cover"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="grid aspect-[2/3] w-full place-items-center rounded-lg border-[3px] border-[#f2f0ea] bg-black p-2.5 text-center text-[13px] leading-tight font-semibold text-[#f2f0ea]"
    >
      {item.title}
    </span>
  );
}

export function ShelfSection() {
  const showPlaceholderTag = shelf.placeholder && process.env.NODE_ENV === "development";

  return (
    <Reveal as="section" id="shelf" aria-labelledby="shelf-title">
      <Band
        id="shelf-title"
        title="Shelf"
        aside={
          <>
            {showPlaceholderTag ? <span className="mr-2 text-acc">placeholder</span> : null}
            anime, manga, games
          </>
        }
      />
      {/* Scrolls sideways on its own; focusable so keyboard users can scroll it too. */}
      <div
        tabIndex={0}
        role="region"
        aria-labelledby="shelf-title"
        className="scrollbar-none snap-x snap-mandatory scroll-px-4 overflow-x-auto overscroll-x-contain outline-offset-[-2px] xs:scroll-px-7"
      >
        <ul className="flex w-max gap-4 px-4 pt-4 pb-5 xs:px-7">
          {shelf.items.map((item) => (
            <li key={`${item.kind}-${item.title}`} className="group w-[120px] shrink-0 snap-start">
              <div className="transition-transform duration-300 ease-soft group-hover:-translate-y-1">
                <Cover item={item} />
              </div>
              <p className="mt-2 truncate text-[13.5px] font-medium text-t1">{item.title}</p>
              <p className="font-mono text-[11px] text-t3">{item.kind}</p>
              <p className="mt-0.5 text-[12.5px] leading-snug text-t3">{item.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
