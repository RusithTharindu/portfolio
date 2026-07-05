import { MotionCard } from "@/src/components/atoms/MotionCard";
import { SectionLabel } from "@/src/components/atoms/SectionLabel";

export function AboutCard() {
  return (
    <MotionCard className="cell c-about" delay={0.1}>
      <div className="about">
        <SectionLabel>About</SectionLabel>
        <p>
          I work across the stack and care about the seams -
          <strong>
            where the API meets the UI, where trust assumptions break, where
            abstractions leak
          </strong>
          . Currently pursuing a Master&apos;s in Cyber Security, which mostly
          means I&apos;ve started reading every system like something will go
          wrong.
        </p>
        <p>
          I&apos;m at my best collaborating on hard problems with people who
          have opinions. Good software is a team argument that ends well.
        </p>
      </div>
    </MotionCard>
  );
}
