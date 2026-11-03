/** A page section the header pills, side rail and menu can point at. */
export type SectionLink = {
  /** Element id on the page. */
  id: string;
  label: string;
  /** Defaults to `#${id}`; set it to link to a section on another page, e.g. "/#work". */
  href?: string;
};

export function sectionHref(section: SectionLink): string {
  return section.href ?? `#${section.id}`;
}
