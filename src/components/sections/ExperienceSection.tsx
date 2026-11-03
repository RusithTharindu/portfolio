import { Band } from "@/src/components/chrome/Band";
import { RevealGroup } from "@/src/components/chrome/RevealGroup";
import { type ExperienceItem, experience } from "@/src/data/experience";
import { formatPeriod } from "@/src/lib/time";

type TimelineSectionProps = {
  id: string;
  title: string;
  kind: ExperienceItem["kind"];
};

function TimelineSection({ id, title, kind }: TimelineSectionProps) {
  const items = experience.filter((item) => item.kind === kind);

  return (
    <RevealGroup as="section" id={id} aria-labelledby={`${id}-title`}>
      <Band id={`${id}-title`} title={title} />
      <ol>
        {items.map((item) => (
          <li
            key={`${item.title}-${item.org}`}
            data-reveal-item=""
            className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-0.5 border-b border-line px-4 py-3.5 last:border-b-0 xs:px-7"
          >
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1 font-medium text-t1">
              <span>
                {item.title} · {item.org}
              </span>
              {item.end === null ? (
                <span className="rounded bg-acc-dim px-1.5 py-px font-mono text-[10px] font-normal text-acc">
                  {kind === "study" ? "in progress" : "current"}
                </span>
              ) : null}
            </span>
            <span className="pt-0.5 font-mono text-[11.5px] whitespace-nowrap text-t3">
              {formatPeriod(item.start, item.end)}
            </span>
            <span className="col-span-2 text-[13px] text-t3">{item.summary}</span>
          </li>
        ))}
      </ol>
    </RevealGroup>
  );
}

/** Jobs. Projects already own the "Work" title and `#work` anchor. */
export function ExperienceSection() {
  return <TimelineSection id="experience" title="Experience" kind="work" />;
}

export function EducationSection() {
  return <TimelineSection id="education" title="Education" kind="study" />;
}
