import Link from "next/link";
import { Logo } from "@/src/components/chrome/Logo";
import { type SectionLink, sectionHref } from "@/src/components/chrome/sections";
import { getCvHref, site } from "@/src/data/site";

type SiteHeaderProps = {
  /** The first three become pills; the first is highlighted. */
  sections: SectionLink[];
};

const pillBase =
  "rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none transition-colors duration-200";
const pillIdle = `${pillBase} border-[#222] bg-[#151515] text-t2 hover:border-[#3a3a3a] hover:text-t1`;
const pillOn = `${pillBase} border-acc bg-acc text-[#111] hover:bg-[#ebb46c]`;

export function SiteHeader({ sections }: SiteHeaderProps) {
  const cvHref = getCvHref();
  const pills = sections.slice(0, 3);

  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-3 xs:px-5">
      <Link href="/" aria-label={`${site.firstName}, home`} className="justify-self-start rounded-lg">
        <Logo size={30} />
      </Link>
      {pills.length > 0 || cvHref ? (
        <nav aria-label="Sections" className="hidden xs:block">
          <ul className="flex gap-1.5">
            {pills.map((section, index) => (
              <li key={section.id}>
                <a href={sectionHref(section)} className={index === 0 ? pillOn : pillIdle}>
                  {section.label}
                </a>
              </li>
            ))}
            {cvHref ? (
              <li>
                <a href={cvHref} className={pillIdle}>
                  cv
                </a>
              </li>
            ) : null}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
