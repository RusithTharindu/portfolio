import { Rule } from "@/src/components/chrome/Rule";

type BandProps = {
  /** Id for the heading, so the section can point `aria-labelledby` at it. */
  id?: string;
  title: string;
  aside?: React.ReactNode;
};

/** The slightly lighter header row that opens every section. */
export function Band({ id, title, aside }: BandProps) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-4 bg-band px-4 py-3 xs:px-7">
        <h2 id={id} className="text-[17px] font-semibold text-t1">
          {title}
        </h2>
        {aside ? <div className="font-mono text-[11px] text-t3">{aside}</div> : null}
      </div>
      <Rule />
    </>
  );
}
