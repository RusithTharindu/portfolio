import { MotionCard } from "@/src/components/atoms/MotionCard";
import { SectionLabel } from "@/src/components/atoms/SectionLabel";
import { education } from "@/src/data/portfolio";

export function EducationCard() {
  return (
    <MotionCard className="cell c-education" id="education" delay={0.45}>
      <div className="education">
        <div className="education-head">
          <SectionLabel>Education</SectionLabel>
          <span className="education-note">academic path</span>
        </div>
        <div className="education-list">
          {education.map((item) => (
            <article
              className="education-item"
              key={`${item.period}-${item.qualification}`}
            >
              <div className="education-period">{item.period}</div>
              <div className="education-body">
                <div className="education-title-row">
                  <h2>{item.qualification}</h2>
                  <span className={`education-state ${item.state}`}>
                    {item.state === "current" ? "Pursuing" : "Completed"}
                  </span>
                </div>
                <div className="education-school">{item.institution}</div>
                <p>{item.description}</p>
                <div className="education-tags">
                  {item.highlights.map((highlight) => (
                    <span className="education-tag" key={highlight}>
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MotionCard>
  );
}
