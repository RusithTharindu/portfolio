import Link from "next/link";
import { Band } from "@/src/components/chrome/Band";
import { RevealGroup } from "@/src/components/chrome/RevealGroup";
import { YearGroupedProjects } from "@/src/components/project/YearGroupedProjects";
import { getFeaturedProjects, groupProjectsByYear } from "@/src/data/projects";

export function WorkSection() {
  const groups = groupProjectsByYear(getFeaturedProjects());

  return (
    <RevealGroup as="section" id="work" aria-labelledby="work-title">
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
    </RevealGroup>
  );
}
