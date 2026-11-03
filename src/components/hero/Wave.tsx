/** A 👋 that waves on hover or keyboard focus. */
export function Wave() {
  return (
    <span
      role="img"
      aria-label="waving hand"
      tabIndex={0}
      className="inline-block origin-[70%_80%] cursor-default rounded-sm hover:animate-wave focus-visible:animate-wave"
    >
      👋
    </span>
  );
}
