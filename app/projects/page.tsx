import type { Metadata } from "next";
import Link from "next/link";
import { Band } from "@/src/components/chrome/Band";
import { MenuPill } from "@/src/components/chrome/MenuPill";
import { Rule } from "@/src/components/chrome/Rule";
import { homeSectionLinks } from "@/src/components/chrome/sections";
import { Shell } from "@/src/components/chrome/Shell";
import { SiteFooter } from "@/src/components/chrome/SiteFooter";
import { SiteHeader } from "@/src/components/chrome/SiteHeader";
import { YearGroupedProjects } from "@/src/components/project/YearGroupedProjects";
import { groupProjectsByYear, projects } from "@/src/data/projects";
import { getCvHref, site } from "@/src/data/site";
import { ogImage } from "@/src/lib/og";

const description =
  "Every project by Rusith Tharindu Thushan: web platforms, mobile apps, event products and full-stack systems, grouped by year.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "/projects/",
    title: `Projects · ${site.firstName}`,
    description,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title: `Projects · ${site.firstName}`, description, images: [ogImage] },
};

export default function ProjectsPage() {
  return (
    <>
      <Shell>
        <SiteHeader sections={[]} />
        <Rule />
        <main>
          <section aria-labelledby="projects-title">
            <h1 className="sr-only">Projects</h1>
            <Band
              id="projects-title"
              title="All projects"
              aside={
                <Link href="/" className="rounded-sm transition-colors hover:text-t1">
                  ← home
                </Link>
              }
            />
            <YearGroupedProjects groups={groupProjectsByYear(projects)} showPreview />
          </section>
          <Rule />
        </main>
        <SiteFooter />
      </Shell>
      <MenuPill sections={homeSectionLinks} cvHref={getCvHref()} />
    </>
  );
}
