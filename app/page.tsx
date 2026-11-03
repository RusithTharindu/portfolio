import { MenuPill } from "@/src/components/chrome/MenuPill";
import { Rule } from "@/src/components/chrome/Rule";
import type { SectionLink } from "@/src/components/chrome/sections";
import { SectionRail } from "@/src/components/chrome/SectionRail";
import { Shell } from "@/src/components/chrome/Shell";
import { SiteFooter } from "@/src/components/chrome/SiteFooter";
import { SiteHeader } from "@/src/components/chrome/SiteHeader";
import { Hero } from "@/src/components/hero/Hero";
import { CommitsSection } from "@/src/components/sections/CommitsSection";
import { ExperienceSection } from "@/src/components/sections/ExperienceSection";
import { NowSection } from "@/src/components/sections/NowSection";
import { ShelfSection } from "@/src/components/sections/ShelfSection";
import { SocialsSection } from "@/src/components/sections/SocialsSection";
import { StackSection } from "@/src/components/sections/StackSection";
import { WorkSection } from "@/src/components/sections/WorkSection";
import { WritingSection } from "@/src/components/sections/WritingSection";
import { getCvHref } from "@/src/data/site";
import { getGitHubActivity, shouldShowCommits } from "@/src/lib/github";
import { getMediumPosts } from "@/src/lib/medium";

export default async function Home() {
  const [posts, activity] = await Promise.all([getMediumPosts(3), getGitHubActivity()]);
  const hasWriting = posts.length > 0;
  const hasCommits = shouldShowCommits(activity, process.env.NODE_ENV);

  // Only sections that actually render, in page order.
  const sections: SectionLink[] = [
    { id: "top", label: "intro" },
    { id: "now", label: "now" },
    { id: "work", label: "work" },
    { id: "experience", label: "experience" },
    ...(hasWriting ? [{ id: "writing", label: "writing" }] : []),
    { id: "shelf", label: "shelf" },
    { id: "socials", label: "socials" },
    { id: "stack", label: "stack" },
    ...(hasCommits ? [{ id: "commits", label: "commits" }] : []),
  ];
  const headerSections = ["work", "writing", "now"].flatMap((id) =>
    sections.filter((section) => section.id === id),
  );

  return (
    <>
      <SectionRail sections={sections} />
      <Shell>
        <SiteHeader sections={headerSections} />
        <Rule />
        <main>
          <Hero />
          <Rule />
          <NowSection />
          <Rule />
          <WorkSection />
          <Rule />
          <ExperienceSection />
          <Rule />
          {hasWriting ? (
            <>
              <WritingSection posts={posts} />
              <Rule />
            </>
          ) : null}
          <ShelfSection />
          <Rule />
          <SocialsSection />
          <Rule />
          <StackSection />
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
      <MenuPill sections={sections.filter((section) => section.id !== "top")} cvHref={getCvHref()} />
    </>
  );
}
