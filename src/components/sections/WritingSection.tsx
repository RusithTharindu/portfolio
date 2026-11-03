import { Band } from "@/src/components/chrome/Band";
import { Reveal } from "@/src/components/chrome/Reveal";
import { site } from "@/src/data/site";
import type { MediumPost } from "@/src/lib/medium";
import { formatDay } from "@/src/lib/time";

type WritingSectionProps = {
  posts: MediumPost[];
};

/** Latest Medium posts. Renders nothing when the feed was empty or unreachable at build time. */
export function WritingSection({ posts }: WritingSectionProps) {
  if (posts.length === 0) return null;

  return (
    <Reveal as="section" id="writing" aria-labelledby="writing-title">
      <Band
        id="writing-title"
        title="Writing"
        aside={
          <a
            href={site.mediumUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm transition-colors hover:text-t1"
          >
            medium ↗<span className="sr-only"> (opens in a new tab)</span>
          </a>
        }
      />
      <ul>
        {posts.map((post) => (
          <li key={post.href} className="border-b border-line last:border-b-0">
            <a
              href={post.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-baseline gap-3 px-4 py-3.5 outline-offset-[-2px] transition-colors duration-200 hover:bg-[#101010] xs:px-7"
            >
              <span className="min-w-0 flex-1">
                <span className="block font-medium text-t1">{post.title}</span>
                <time dateTime={post.publishedAt} className="font-mono text-[11.5px] text-t3">
                  {formatDay(post.publishedAt)}
                </time>
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
              <span
                aria-hidden="true"
                className="shrink-0 text-[12px] text-t4 transition duration-[250ms] ease-soft group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-acc group-focus-visible:text-acc"
              >
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
