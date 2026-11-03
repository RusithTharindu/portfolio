type EntranceProps = {
  children: React.ReactNode;
  /** Position in the hero stagger; each step adds 90ms. */
  step: number;
  as?: "div" | "p" | "h1";
  className?: string;
  id?: string;
};

/**
 * Hero text entrance: fade, small rise and a blur that clears, staggered by `step`.
 * Pure CSS so it starts with the first paint instead of waiting for hydration
 * (the hero text is the page's largest contentful paint).
 */
export function Entrance({ children, step, as: Element = "div", className = "", id }: EntranceProps) {
  return (
    <Element
      id={id}
      className={`animate-rise ${className}`}
      style={{ animationDelay: `${150 + step * 90}ms` }}
    >
      {children}
    </Element>
  );
}
