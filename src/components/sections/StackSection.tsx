import { Band } from "@/src/components/chrome/Band";
import { Reveal } from "@/src/components/chrome/Reveal";
import { stack } from "@/src/data/stack";

export function StackSection() {
  return (
    <Reveal as="section" id="stack" aria-labelledby="stack-title">
      <Band id="stack-title" title="Stack" />
      <ol className="px-4 py-2 xs:px-7">
        {stack.map((group, index) => (
          <li
            key={group.group}
            className="grid grid-cols-[2.25rem_1fr] gap-x-2 gap-y-0.5 border-b border-dashed border-[#232323] py-2.5 last:border-b-0 md:grid-cols-[2.25rem_15rem_1fr]"
          >
            <span aria-hidden="true" className="pt-px font-mono text-[12px] text-t4">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-medium text-t1">{group.group}</span>
            <span className="col-start-2 text-t2 md:col-start-auto">{group.items.join(" · ")}</span>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
