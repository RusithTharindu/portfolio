import { Band } from "@/src/components/chrome/Band";
import { Reveal } from "@/src/components/chrome/Reveal";
import { SocialIcon } from "@/src/components/sections/SocialIcon";
import { socials } from "@/src/data/site";

export function SocialsSection() {
  return (
    <Reveal as="section" id="socials" aria-labelledby="socials-title">
      <Band id="socials-title" title="Socials" />
      <ul>
        {socials.map((social) => (
          <li key={social.label} className="border-b border-line last:border-b-0">
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3.5 px-4 py-3.5 outline-offset-[-2px] transition-colors duration-200 hover:bg-[#101010] xs:px-7"
            >
              <span
                aria-hidden="true"
                className="grid size-[38px] flex-none place-items-center rounded-[9px] border border-[#242424] bg-[#151515] text-t1 transition-transform duration-[350ms] ease-pop group-hover:scale-[1.06] group-hover:-rotate-[8deg] group-focus-visible:scale-[1.06] group-focus-visible:-rotate-[8deg]"
              >
                <SocialIcon name={social.icon} size={16} />
              </span>
              <span className="min-w-0">
                <span className="block font-medium text-t1">{social.label}</span>
                <span className="block truncate font-mono text-[12px] text-t3">{social.handle}</span>
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
              <span
                aria-hidden="true"
                className="ml-auto text-t4 transition duration-[250ms] ease-soft group-hover:translate-x-1 group-hover:text-t2 group-focus-visible:translate-x-1"
              >
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
