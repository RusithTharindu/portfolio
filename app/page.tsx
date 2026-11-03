import { MenuPill } from "@/src/components/chrome/MenuPill";
import { Rule } from "@/src/components/chrome/Rule";
import type { SectionLink } from "@/src/components/chrome/sections";
import { Shell } from "@/src/components/chrome/Shell";
import { SiteFooter } from "@/src/components/chrome/SiteFooter";
import { SiteHeader } from "@/src/components/chrome/SiteHeader";
import { Hero } from "@/src/components/hero/Hero";
import { CommitsSection } from "@/src/components/sections/CommitsSection";
import {
  EducationSection,
  ExperienceSection,
} from "@/src/components/sections/ExperienceSection";
// Now section is hidden for the time being.
// import { NowSection } from "@/src/components/sections/NowSection";
// Book shelf is hidden for the time being.
// import { ShelfSection } from "@/src/components/sections/ShelfSection";
import { SocialsSection } from "@/src/components/sections/SocialsSection";
import { StackSection } from "@/src/components/sections/StackSection";
import { WorkSection } from "@/src/components/sections/WorkSection";
import { WritingSection } from "@/src/components/sections/WritingSection";
import { getCvHref } from "@/src/data/site";
import { getGitHubActivity, shouldShowCommits } from "@/src/lib/github";
import { getMediumPosts } from "@/src/lib/medium";

export default async function Home() {
  const [posts, activity] = await Promise.all([
    getMediumPosts(3),
    getGitHubActivity(),
  ]);
  const hasWriting = posts.length > 0;
  const hasCommits = shouldShowCommits(activity, process.env.NODE_ENV);

  // Only sections that actually render, in page order.
  const sections: SectionLink[] = [
    // { id: "now", label: "now" },
    { id: "work", label: "work" },
    { id: "experience", label: "experience" },
    { id: "education", label: "education" },
    ...(hasWriting ? [{ id: "writing", label: "writing" }] : []),
    // { id: "shelf", label: "shelf" },
    { id: "stack", label: "stack" },
    { id: "socials", label: "socials" },
    ...(hasCommits ? [{ id: "commits", label: "commits" }] : []),
  ];
  const headerSections = ["writing", "now"].flatMap((id) =>
    sections.filter((section) => section.id === id),
  );

  return (
    <>
      <Shell>
        <SiteHeader sections={headerSections} />
        <Rule />
        <main>
          <Hero />
          <Rule />
          {/* <NowSection />
          <Rule /> */}
          <WorkSection />
          <Rule />
          <ExperienceSection />
          <Rule />
          <EducationSection />
          <Rule />
          {hasWriting ? (
            <>
              <WritingSection posts={posts} />
              <Rule />
            </>
          ) : null}
          {/* <ShelfSection />
          <Rule /> */}
          <StackSection />
          <Rule />
          <SocialsSection />
          <Rule />
          {hasCommits ? (
            <>
              <CommitsSection activity={activity} />
              <Rule />
            </>
          ) : null}
        </main>
        <SiteFooter />
      </Shell>
      <MenuPill sections={sections} cvHref={getCvHref()} />
    </>
  );
}
