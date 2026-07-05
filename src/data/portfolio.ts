export const stackGroups: Array<[string, string[]]> = [
  ["Languages", ["TypeScript", "JavaScript", "Java"]],
  ["Frontend", ["React", "Next.js", "Tailwind"]],
  ["Backend", ["Node.js", "NestJS", "Spring Boot", "Express"]],
  ["Databases", ["PostgreSQL", "MongoDB", "Redis", "MySQL"]],
  ["Cloud", ["AWS", "Azure", "Docker"]],
  ["CI/CD", ["GitHub Actions", "Jenkins"]],
  ["Animation", ["Motion", "GSAP"]],
  ["Testing", ["Postman", "Insomnia"]],
  ["Design", ["Figma"]],
];

export const stats: Array<[string, string, string]> = [
  ["2.5", "yr", "Shipping in prod"],
  ["24", "+", "Projects delivered"],
  ["1.2k", "up", "Commits / year"],
  ["02", "*", "OSS contributions"],
];

export const timeline: Array<[string, string, string, string]> = [
  [
    "2024 - PRESENT",
    "Software Engineer",
    "Rootcode",
    "Develop and maintain high-performance web applications using React, Next JS, Spring Boot. Collaborate with cross-functional teams to deliver scalable solutions. ",
  ],
  [
    "2022 - 2024",
    "Software Engineer",
    "Flyxto",
    "Build scalable web applications using React and Next.js. Implement RESTful APIs and integrate with third-party services.",
  ],
];

export type EducationItem = {
  period: string;
  qualification: string;
  institution: string;
  state: "current" | "completed";
  description: string;
  highlights: string[];
};

export const education: EducationItem[] = [
  {
    period: "2025 - PRESENT",
    qualification: "Master's Degree in Cybersecurity",
    institution: "University of Staffordshire",
    state: "current",
    description:
      "Currently studying advanced cybersecurity, secure systems, threat modeling, and defensive engineering practices.",
    highlights: [
      "Cybersecurity",
      "Secure systems",
      "Threat modeling",
      "Risk management",
    ],
  },
  {
    period: "2021 - 2025",
    qualification: "Bachelor's Degree in Software Engineering",
    institution: "University of Plymouth",
    state: "completed",
    description:
      "Focused on software engineering fundamentals, distributed systems, databases, and production-grade application development.",
    highlights: [
      "Software engineering",
      "Data structures",
      "Databases",
      "Cloud systems",
    ],
  },
];

export const socials = [
  {
    label: "GitHub",
    icon: "github",
    href: "https://github.com/RusithTharindu",
  },
  {
    label: "LinkedIn",
    icon: "linkedin",
    href: "https://www.linkedin.com/in/rusith-tharindu-thushan/",
  },
  {
    label: "X / Twitter",
    icon: "x",
    href: "https://x.com/ruziya66_",
  },
  {
    label: "Medium",
    icon: "medium",
    href: "https://medium.com/@devrusith",
  },
  {
    label: "Bluesky",
    icon: "bluesky",
    href: "https://bsky.app/profile/rusiththarindu.bsky.social",
  },
] as const;
