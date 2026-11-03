import { Rule } from "@/src/components/chrome/Rule";
import type { SectionLink } from "@/src/components/chrome/sections";
import { Shell } from "@/src/components/chrome/Shell";
import { SiteHeader } from "@/src/components/chrome/SiteHeader";
import { Hero } from "@/src/components/hero/Hero";
import { ExperienceSection } from "@/src/components/sections/ExperienceSection";
import { NowSection } from "@/src/components/sections/NowSection";
import { SocialsSection } from "@/src/components/sections/SocialsSection";
import { StackSection } from "@/src/components/sections/StackSection";
import { WorkSection } from "@/src/components/sections/WorkSection";

const headerSections: SectionLink[] = [
  { id: "work", label: "work" },
  { id: "now", label: "now" },
];

export default function Home() {
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
        <SocialsSection />
        <Rule />
        <StackSection />
        <Rule />
      </main>
    </Shell>
  );
}
