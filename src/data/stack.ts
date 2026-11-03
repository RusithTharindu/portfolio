export type StackGroup = {
  group: string;
  items: string[];
};

export const stack: StackGroup[] = [
  { group: "Language", items: ["TypeScript", "Java"] },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind", "Motion"] },
  { group: "Backend", items: ["Node.js", "NestJS", "Spring Boot"] },
  { group: "Data", items: ["PostgreSQL", "MongoDB", "Redis"] },
  { group: "Infra", items: ["AWS", "Docker", "GitHub Actions"] },
];
