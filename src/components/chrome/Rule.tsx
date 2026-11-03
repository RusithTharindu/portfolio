/** A 1px horizontal rule that runs past the column rails to the viewport edges. */
export function Rule() {
  return <div aria-hidden="true" className="-mx-[100vw] h-px bg-rail" />;
}
