export type ExperienceItem = {
  title: string;
  org: string;
  kind: "work" | "study";
  start: number;
  /** `null` while ongoing. */
  end: number | null;
  summary: string;
};

export const experience: ExperienceItem[] = [
  {
    title: "Software Engineer",
    org: "Rootcode",
    kind: "work",
    start: 2024,
    end: null,
    summary: "React, Next.js and Spring Boot for high-traffic web products.",
  },
  {
    title: "Software Engineer",
    org: "Flyxto",
    kind: "work",
    start: 2022,
    end: 2024,
    summary: "React and Next.js apps, REST APIs and third-party integrations.",
  },
  {
    title: "MSc Cybersecurity",
    org: "Staffordshire",
    kind: "study",
    start: 2025,
    end: null,
    summary: "Threat modelling, secure systems and defensive engineering.",
  },
  {
    title: "BSc Software Engineering",
    org: "Plymouth",
    kind: "study",
    start: 2021,
    end: 2025,
    summary: "Distributed systems, databases and production-grade apps.",
  },
];
