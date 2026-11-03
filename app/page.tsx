import { Rule } from "@/src/components/chrome/Rule";
import type { SectionLink } from "@/src/components/chrome/sections";
import { Shell } from "@/src/components/chrome/Shell";
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
import { getGitHubActivity, shouldShowCommits } from "@/src/lib/github";
import { getMediumPosts } from "@/src/lib/medium";

export default async function Home() {
  const [posts, activity] = await Promise.all([getMediumPosts(3), getGitHubActivity()]);
  const hasWriting = posts.length > 0;
  const hasCommits = shouldShowCommits(activity, process.env.NODE_ENV);

  const headerSections: SectionLink[] = [
    { id: "work", label: "work" },
    ...(hasWriting ? [{ id: "writing", label: "writing" }] : []),
    { id: "now", label: "now" },
  ];

  return (
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
    </Shell>
  );
}
