export type Site = {
  name: "Rusith Tharindu Thushan";
  firstName: "Rusith";
  role: string;
  company: { name: string; href: string };
  location: { label: "Sri Lanka"; timeZone: "Asia/Colombo" };
  openToChat: boolean;
  /** Local path (e.g. "/cv.pdf") or URL. While `null`, every CV link stays hidden. */
  cvHref: string | null;
  mediumFeedUrl: "https://medium.com/feed/@devrusith";
  mediumUrl: string;
  githubUrl: string;
  githubUsername: string;
  v1Url: "https://github.com/RusithTharindu/portfolio/tree/v1";
  url: "https://rusith.dev";
  /** `ogSrc` is a PNG copy for the social preview image, which can't read WebP. */
  logo: { src: string; ogSrc: string; alt: string };
};

export const site: Site = {
  name: "Rusith Tharindu Thushan",
  firstName: "Rusith",
  role: "Software Engineer",
  company: { name: "Rootcode", href: "https://rootcode.io" },
  location: { label: "Sri Lanka", timeZone: "Asia/Colombo" },
  openToChat: true,
  cvHref: null,
  mediumFeedUrl: "https://medium.com/feed/@devrusith",
  mediumUrl: "https://medium.com/@devrusith",
  githubUrl: "https://github.com/RusithTharindu",
  githubUsername: "RusithTharindu",
  v1Url: "https://github.com/RusithTharindu/portfolio/tree/v1",
  url: "https://rusith.dev",
  // Swap for "/brand/logo.png" once the real ink logo lands.
  logo: { src: "/brand/logo.webp", ogSrc: "/brand/logo-og.png", alt: "Rusith's ink-brush logo" },
};

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
  icon: "github" | "linkedin" | "x" | "instagram" | "medium" | "bluesky";
};

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    handle: "@RusithTharindu",
    href: "https://github.com/RusithTharindu",
    icon: "github",
  },
  {
    label: "LinkedIn",
    handle: "rusith-tharindu-thushan",
    href: "https://www.linkedin.com/in/rusith-tharindu-thushan/",
    icon: "linkedin",
  },
  {
    label: "Medium",
    handle: "@devrusith",
    href: "https://medium.com/@devrusith",
    icon: "medium",
  },
  {
    label: "X",
    handle: "@ruziya66_",
    href: "https://x.com/ruziya66_",
    icon: "x",
  },
  {
    label: "Instagram",
    handle: "@ruziya66_",
    href: "https://www.instagram.com/ruziya66_",
    icon: "instagram",
  },
  {
    label: "Bluesky",
    handle: "@rusiththarindu.bsky.social",
    href: "https://bsky.app/profile/rusiththarindu.bsky.social",
    icon: "bluesky",
  },
];

/** The CV link to render, or `null` when none is configured. */
export function getCvHref(s: Pick<Site, "cvHref"> = site): string | null {
  const href = s.cvHref?.trim();
  return href ? href : null;
}
