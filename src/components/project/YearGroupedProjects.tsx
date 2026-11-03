import Link from "next/link";
import type { ProjectYearGroup } from "@/src/data/projects";

type YearGroupedProjectsProps = {
  groups: ProjectYearGroup[];
  /** Shows a small tilted screenshot on hover, on wide screens with a mouse. */
  showPreview: boolean;
};

export function YearGroupedProjects({ groups, showPreview }: YearGroupedProjectsProps) {
  return (
    <div className="pb-3.5">
      {groups.map((group) => (
        <div key={group.year}>
          <h3 className="px-4 pt-4 pb-1.5 xs:px-7">
            <span className="rounded bg-[#1a1a1a] px-2 font-serif text-[18px] text-t1 italic">
              {group.year}
            </span>
          </h3>
          <ul>
            {group.projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group relative flex items-baseline gap-3 py-[9px] pr-4 pl-6 outline-offset-[-2px] before:absolute before:inset-x-2 before:inset-y-0.5 before:rounded-lg before:bg-[#141414] before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 focus-visible:before:opacity-100 xs:pr-7 xs:pl-10 xs:before:inset-x-4"
                >
                  <span className="relative min-w-0 flex-1">
                    <span className="text-[14px] font-semibold text-t1">{project.title}</span>
                    <span className="block text-t3 transition-colors duration-200 group-hover:text-t2 xs:ml-3 xs:inline">
                      {project.tagline}
                    </span>
                  </span>
                  {project.isNew ? (
                    <span className="relative shrink-0 rounded bg-acc-dim px-1.5 py-px font-mono text-[10px] text-acc">
                      new
                    </span>
                  ) : null}
                  <span
                    aria-hidden="true"
                    className="relative shrink-0 text-[12px] text-t4 transition duration-[250ms] ease-soft group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-acc group-focus-visible:translate-x-[3px] group-focus-visible:-translate-y-[3px] group-focus-visible:text-acc"
                  >
                    ↗
                  </span>
                  {showPreview && project.previewImage ? (
                    // Decorative: the link text already names the project.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.previewImage}
                      alt=""
                      width={150}
                      height={92}
                      loading="lazy"
                      decoding="async"
                      className="pointer-events-none absolute top-1/2 right-[92px] z-[3] hidden h-[92px] w-[150px] -translate-y-[40%] scale-[0.92] -rotate-3 rounded-[10px] border border-[#2a2a2a] bg-[#101010] object-cover object-top opacity-0 shadow-[0_12px_30px_rgba(0,0,0,0.6)] transition-[opacity,translate,scale] duration-[350ms] ease-soft group-hover:-translate-y-1/2 group-hover:scale-100 group-hover:opacity-100 md:[@media(hover:hover)]:block"
                    />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
