import type { Metadata, Viewport } from "next";
import { Gochi_Hand, IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import { MotionProvider } from "@/src/components/chrome/MotionProvider";
import { site } from "@/src/data/site";
import { ogImage } from "@/src/lib/og";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const gochiHand = Gochi_Hand({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gochi-hand",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-newsreader",
  display: "swap",
  preload: false,
});

/** Without JS, entrance and reveal states must not hide content or undrawn strokes. */
const noScriptCss =
  "[data-reveal]{opacity:1!important;transform:none!important;scale:none!important;translate:none!important;filter:none!important}" +
  "[data-draw]{stroke-dasharray:none!important;stroke-dashoffset:0!important}";

const title = `${site.name} · ${site.role}`;
const description = `${site.firstName} is a ${site.role.toLowerCase()} at ${site.company.name} in ${site.location.label}, building full-stack products and studying cybersecurity.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s · ${site.firstName}`,
  },
  description,
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en",
    title,
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#090909",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`dark ${plexSans.variable} ${plexMono.variable} ${gochiHand.variable} ${newsreader.variable}`}
    >
      <head>
        <noscript>
          <style>{noScriptCss}</style>
        </noscript>
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
