/** A page section the header pills and menu can point at. */
export type SectionLink = {
  /** Element id on the page. */
  id: string;
  label: string;
  /** Defaults to `#${id}`; set it to link to a section on another page, e.g. "/#work". */
  href?: string;
};

/** Menu links from pages other than home: sections that always render there. */
export const homeSectionLinks: SectionLink[] = [
  { id: "home", label: "home", href: "/" },
  { id: "work", label: "work", href: "/#work" },
  { id: "experience", label: "experience", href: "/#experience" },
  { id: "education", label: "education", href: "/#education" },
  // Hidden with the book shelf on the home page.
  // { id: "shelf", label: "shelf", href: "/#shelf" },
  { id: "socials", label: "socials", href: "/#socials" },
  { id: "stack", label: "stack", href: "/#stack" },
];

export function sectionHref(section: SectionLink): string {
  return section.href ?? `#${section.id}`;
}
