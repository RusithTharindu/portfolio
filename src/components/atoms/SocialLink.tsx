type SocialLinkProps = {
  href?: string;
  label: string;
  variant?: "primary" | "icon";
  children?: React.ReactNode;
};

export function SocialLink({
  href = "#",
  label,
  variant,
  children,
}: SocialLinkProps) {
  const className = variant ? `social ${variant}` : "social";
  const isExternal = href.startsWith("http");
  const hasVisibleText = variant !== "icon";

  return (
    <a
      href={href}
      className={className}
      aria-label={hasVisibleText ? undefined : label}
      title={variant === "icon" ? label : undefined}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      {children ?? label.slice(0, 1)}
    </a>
  );
}
