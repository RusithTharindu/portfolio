import Link from "next/link";
import { Band } from "@/src/components/chrome/Band";
import { Reveal } from "@/src/components/chrome/Reveal";
import { Rule } from "@/src/components/chrome/Rule";
import { BrushUnderline } from "@/src/components/hero/BrushUnderline";
import type { Project } from "@/src/data/projects";

type ProjectDetailProps = {
  project: Project;
  next: Project | null;
};

const pad = "px-4 xs:px-7";

function TextBand({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <>
      <Reveal as="section" aria-labelledby={id}>
        <Band id={id} title={title} />
        <div className={`${pad} py-4`}>{children}</div>
      </Reveal>
      <Rule />
    </>
  );
}

export function ProjectDetail({ project, next }: ProjectDetailProps) {
  const [primary, ...secondary] = project.actions;

  return (
    <article>
      <header className={`${pad} pt-4 pb-7`}>
        <Link
          href="/projects"
          className="inline-block rounded-sm font-mono text-[12px] text-t3 transition-colors hover:text-t1"
        >
          ← all projects
        </Link>
        <p className="mt-6 font-mono text-[12px] text-t3">
          {project.number} · {project.year} · {project.status.toLowerCase()}
        </p>
        <h1 className="mt-2 text-[24px] leading-[1.3] font-semibold tracking-[-0.015em] text-t1 xs:text-[28px]">
          {project.heading.before ? `${project.heading.before} ` : null}
          <BrushUnderline>{project.heading.emphasis}</BrushUnderline>
          <span className="mt-1 block font-normal text-t2">{project.heading.after}</span>
        </h1>
        <p className="mt-5 max-w-[600px]">{project.lede}</p>
        {project.actions.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {primary ? (
              <li>
                <a
                  href={primary.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full border border-acc bg-acc px-3.5 py-1.5 font-mono text-[12px] text-[#111] transition-colors hover:bg-[#ebb46c]"
                >
                  {primary.label} ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ) : null}
            {secondary.map((action) => (
              <li key={action.href}>
                <a
                  href={action.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full border border-[#2a2a2a] bg-[#151515] px-3.5 py-1.5 font-mono text-[12px] text-t2 transition-colors hover:border-[#3a3a3a] hover:text-t1"
                >
                  {action.label} ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
        {project.previewImage ? (
          // Local static screenshot; next/image adds nothing with unoptimized export images.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.previewImage}
            alt={project.previewAlt ?? `${project.title} preview`}
            width={project.previewSize?.width}
            height={project.previewSize?.height}
            decoding="async"
            className="mt-7 h-auto w-full rounded-xl border border-[#242424] bg-[#101010]"
          />
        ) : null}
      </header>
      <Rule />

      <TextBand id="problem-title" title="Problem">
        <p>{project.overview.problem}</p>
      </TextBand>
      <TextBand id="approach-title" title="Approach">
        <p>{project.overview.approach}</p>
      </TextBand>
      <TextBand id="role-title" title="Role">
        <p>{project.role}</p>
      </TextBand>
      <TextBand id="highlights-title" title="Highlights">
        <ul className="flex flex-col gap-2.5">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="relative pl-5">
              <span aria-hidden="true" className="absolute top-0 left-0 font-mono text-acc">
                ·
              </span>
              {highlight}
            </li>
          ))}
        </ul>
      </TextBand>
      <TextBand id="stack-title" title="Stack">
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded-full border border-[#242424] bg-[#151515] px-2.5 py-1 font-mono text-[11.5px] text-t2"
            >
              {item}
            </li>
          ))}
        </ul>
      </TextBand>
      <TextBand id="glance-title" title="At a glance">
        <dl className="grid grid-cols-1 gap-x-6 gap-y-1 font-mono text-[12.5px] xs:grid-cols-[10rem_1fr] xs:gap-y-2">
          {project.glance.map(([key, value]) => (
            <div key={key} className="contents">
              <dt className="text-t3">{key}</dt>
              <dd className="mb-2 text-t2 xs:mb-0">{value}</dd>
            </div>
          ))}
        </dl>
      </TextBand>

      {next ? (
        <>
          <Link
            href={`/projects/${next.slug}`}
            className={`group flex items-baseline gap-3 ${pad} py-5 outline-offset-[-2px] transition-colors hover:bg-[#101010]`}
          >
            <span className="font-mono text-[12px] text-t3">next</span>
            <span className="min-w-0 flex-1">
              <span className="font-semibold text-t1">{next.title}</span>
              <span className="ml-3 hidden text-t3 xs:inline">{next.tagline}</span>
            </span>
            <span
              aria-hidden="true"
              className="text-t4 transition duration-[250ms] ease-soft group-hover:translate-x-1 group-hover:text-acc"
            >
              →
            </span>
          </Link>
          <Rule />
        </>
      ) : null}
    </article>
  );
}
