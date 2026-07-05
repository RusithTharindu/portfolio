import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Text } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmSerifText = DM_Serif_Text({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rusith Tharindu Thushan - Software Engineer",
  description:
    "Portfolio of Rusith Tharindu Thushan, a software engineer building resilient full-stack systems.",
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
      className={`${dmSans.variable} ${dmSerifText.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
