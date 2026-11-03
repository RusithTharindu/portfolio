import { Band } from "@/src/components/chrome/Band";
import { Rule } from "@/src/components/chrome/Rule";
import type { SectionLink } from "@/src/components/chrome/sections";
import { Shell } from "@/src/components/chrome/Shell";
import { SiteHeader } from "@/src/components/chrome/SiteHeader";
import { Hero } from "@/src/components/hero/Hero";

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
        <section id="work" aria-labelledby="work-title">
          <Band id="work-title" title="Work" />
        </section>
      </main>
    </Shell>
  );
}
