import { BrushUnderline } from "@/src/components/hero/BrushUnderline";
import { Entrance } from "@/src/components/hero/Entrance";
import { LiveClock } from "@/src/components/hero/LiveClock";
import { StickerStage } from "@/src/components/hero/StickerStage";
import { Wave } from "@/src/components/hero/Wave";
import { site } from "@/src/data/site";

function Emphasis({ children }: { children: React.ReactNode }) {
  return <span className="border-b border-[#333] text-t1">{children}</span>;
}

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="px-4 xs:px-7">
      <StickerStage />

      <Entrance step={5} className="mt-[18px] mb-0.5 font-hand text-[23px] text-t1">
        Ayubowan, I&apos;m {site.firstName} <Wave />
      </Entrance>

      <Entrance
        as="h1"
        step={6}
        id="hero-title"
        className="mb-2.5 text-[24px] leading-[1.3] font-semibold tracking-[-0.015em] text-t1"
      >
        I build full-stack products, and I&apos;m learning to <BrushUnderline>break them</BrushUnderline>.
      </Entrance>

      <Entrance as="p" step={7} className="mb-3.5 max-w-[560px]">
        Software engineer at <Emphasis>{site.company.name}</Emphasis>. I like turning slow,
        form-heavy processes into software people don&apos;t dread. Evenings go to an{" "}
        <Emphasis>MSc in Cybersecurity</Emphasis>.
      </Entrance>

      <Entrance
        step={8}
        className="flex flex-wrap gap-x-4 gap-y-1 pb-[26px] font-mono text-[12px] text-t3"
      >
        <span>
          <span aria-hidden="true">◎ </span>
          {site.location.label} · <LiveClock timeZone={site.location.timeZone} />
        </span>
        {site.openToChat ? (
          <span className="inline-flex items-center">
            <span aria-hidden="true" className="relative mr-1.5 inline-block size-[7px] rounded-full bg-live">
              <span className="absolute inset-0 animate-live-ping rounded-full bg-live" />
            </span>
            open to chat
          </span>
        ) : null}
      </Entrance>
    </section>
  );
}
