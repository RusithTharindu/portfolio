import Link from "next/link";
import { Band } from "@/src/components/chrome/Band";
import { Reveal } from "@/src/components/chrome/Reveal";
import { YearGroupedProjects } from "@/src/components/project/YearGroupedProjects";
import { getFeaturedProjects, groupProjectsByYear } from "@/src/data/projects";

export function WorkSection() {
  const groups = groupProjectsByYear(getFeaturedProjects());

  return (
    <Reveal as="section" id="work" aria-labelledby="work-title">
      <Band
        id="work-title"
        title="Work"
        aside={
          <Link href="/projects" className="rounded-sm transition-colors hover:text-t1">
            all projects →
          </Link>
        }
      />
      <YearGroupedProjects groups={groups} showPreview />
    </Reveal>
  );
}
