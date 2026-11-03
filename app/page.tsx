import { Band } from "@/src/components/chrome/Band";
import { Logo } from "@/src/components/chrome/Logo";
import { Rule } from "@/src/components/chrome/Rule";
import { Shell } from "@/src/components/chrome/Shell";

export default function Home() {
  return (
    <Shell>
      <header className="flex items-center justify-between px-5 py-3">
        <Logo size={30} />
      </header>
      <Rule />
      <main>
        <section id="work" aria-labelledby="work-title">
          <Band id="work-title" title="Work" />
        </section>
      </main>
    </Shell>
  );
}
