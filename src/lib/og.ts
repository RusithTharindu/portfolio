import { site } from "@/src/data/site";

/** The social card served at /og.png (see app/og.png/route.tsx). */
export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${site.name}, ${site.role.toLowerCase()} at ${site.company.name}`,
  type: "image/png",
} as const;
