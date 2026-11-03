import { Band } from "@/src/components/chrome/Band";
import { Reveal } from "@/src/components/chrome/Reveal";
import { experience } from "@/src/data/experience";
import { formatPeriod } from "@/src/lib/time";

export function ExperienceSection() {
  return (
    <Reveal as="section" id="experience" aria-labelledby="experience-title">
      <Band id="experience-title" title="Experience" />
      <ol>
        {experience.map((item) => (
          <li
            key={`${item.title}-${item.org}`}
            className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-0.5 border-b border-line px-4 py-3.5 last:border-b-0 xs:px-7"
          >
            <span className="font-medium text-t1">
              {item.title} · {item.org}
            </span>
            <span className="pt-0.5 font-mono text-[11.5px] whitespace-nowrap text-t3">
              {formatPeriod(item.start, item.end)}
            </span>
            <span className="col-span-2 text-[13px] text-t3">{item.summary}</span>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
