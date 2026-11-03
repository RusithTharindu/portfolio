type ShellProps = {
  children: React.ReactNode;
};

/** The centred 720px column framed by 1px rails. The hatch outside comes from `body`. */
export function Shell({ children }: ShellProps) {
  return (
    <div className="relative mx-auto min-h-dvh w-full max-w-[720px] border-x border-rail bg-panel">
      {children}
    </div>
  );
}
