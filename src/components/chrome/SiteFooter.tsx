import { Rule } from "@/src/components/chrome/Rule";
import { Signature } from "@/src/components/chrome/Signature";
import { site } from "@/src/data/site";

export function SiteFooter() {
  return (
    <footer>
      <div className="flex flex-col items-center gap-1 px-4 pt-[34px] pb-2.5 xs:px-7">
        <Signature />
        <p className="font-mono text-[11px] text-t3">thanks for scrolling this far</p>
      </div>
      <Rule />
      {/* Bottom padding keeps the floating Menu pill clear of the last line. */}
      <div className="flex flex-wrap justify-between gap-2 px-4 pt-[18px] pb-28 font-mono text-[11.5px] text-t3 xs:px-7">
        <p>built by rusith, with too much tea</p>
        <p>
          v2 ·{" "}
          <a
            href={site.v1Url}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm text-t2 underline decoration-[#333] underline-offset-4 transition-colors hover:text-t1"
          >
            see v1 →<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
