import { Band } from "@/src/components/chrome/Band";
import { Reveal } from "@/src/components/chrome/Reveal";
import { now } from "@/src/data/now";
import { formatMonth } from "@/src/lib/time";

export function NowSection() {
  const showPlaceholderTag = now.placeholder && process.env.NODE_ENV === "development";

  return (
    <Reveal as="section" id="now" aria-labelledby="now-title">
      <Band
        id="now-title"
        title="Now"
        aside={
          <>
            {showPlaceholderTag ? <span className="mr-2 text-acc">placeholder</span> : null}
            updated {formatMonth(now.updated)}
          </>
        }
      />
      <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 px-4 py-4 xs:px-7">
        {now.entries.map((entry) => (
          <div key={entry.label} className="contents">
            <dt className="pt-px font-mono text-[12px] text-t3">{entry.label}</dt>
            <dd className="text-t2">{entry.value}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
