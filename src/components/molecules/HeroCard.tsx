import { MotionCard } from "@/src/components/atoms/MotionCard";
import { getCurrentYear } from "@/src/lib/date";

export function HeroCard() {
  const currentYear = getCurrentYear();

  return (
    <MotionCard className="cell c-hero" skipEntranceAnimation>
      <div className="hero">
        <div className="hero-top">
          <div className="hero-meta">- PORTFOLIO / {currentYear}</div>
          <div className="hero-meta">INDEX &middot; 01</div>
        </div>
        <div>
          <h1 className="hero-title" style={{ gap: "15px" }}>
            <span className="hero-title-group">
              <span>Rusith Tharindu</span>
              <span>Thushan.</span>
            </span>
            <em>Software engineer</em>
            <span className="hero-title-group">
              <span>Full-stack by trade,</span>
              <span>security-minded by study.</span>
            </span>
          </h1>
          <p className="hero-sub">
            I build products across the full stack - clean APIs, tight
            frontends, and the invisible layer in between. Currently deepening
            into security while shipping production software that holds up.
          </p>
        </div>
      </div>
    </MotionCard>
  );
}
