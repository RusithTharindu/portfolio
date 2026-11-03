import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MenuPill } from "@/src/components/chrome/MenuPill";
import { Rule } from "@/src/components/chrome/Rule";
import { homeSectionLinks } from "@/src/components/chrome/sections";
import { Shell } from "@/src/components/chrome/Shell";
import { SiteFooter } from "@/src/components/chrome/SiteFooter";
import { SiteHeader } from "@/src/components/chrome/SiteHeader";
import { ProjectDetail } from "@/src/components/project/ProjectDetail";
import { getNextProject, getProject, projects } from "@/src/data/projects";
import { getCvHref, site } from "@/src/data/site";
import { ogImage } from "@/src/lib/og";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): Array<{ slug: string }> {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const title = `${project.title} · ${site.firstName}`;
  const url = `/projects/${project.slug}/`;

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: site.name,
      url,
      title,
      description: project.description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description: project.description, images: [ogImage] },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const next = getNextProject(project.slug) ?? null;

  return (
    <>
      <Shell>
        <SiteHeader sections={[]} />
        <Rule />
        <main>
          <ProjectDetail project={project} next={next?.slug === project.slug ? null : next} />
        </main>
        <SiteFooter />
      </Shell>
      <MenuPill sections={homeSectionLinks} cvHref={getCvHref()} />
    </>
  );
}
