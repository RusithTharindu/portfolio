import { site } from "@/src/data/site";

type LogoProps = {
  size: number;
  className?: string;
};

/** Rusith's ink-brush logo on black, in a small rounded square. */
export function Logo({ size, className = "" }: LogoProps) {
  return (
    // A tiny static brand mark: next/image adds nothing with unoptimized export images.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={site.logo.src}
      alt={site.logo.alt}
      width={size}
      height={size}
      className={`block shrink-0 rounded-lg border border-[#222] bg-black object-cover ${className}`}
    />
  );
}
