import { Band } from "@/src/components/chrome/Band";
import { Reveal } from "@/src/components/chrome/Reveal";
import { Bookshelf } from "@/src/components/sections/Bookshelf";
import { books } from "@/src/data/books";

export function ShelfSection() {
  if (books.items.length === 0) return null;

  const showPlaceholderTag = books.placeholder && process.env.NODE_ENV === "development";

  return (
    <Reveal as="section" id="shelf" aria-labelledby="shelf-title">
      <Band
        id="shelf-title"
        title="Shelf"
        aside={
          <>
            {showPlaceholderTag ? <span className="mr-2 text-acc">placeholder</span> : null}
            books I keep going back to
          </>
        }
      />
      <Bookshelf items={books.items} />
    </Reveal>
  );
}
