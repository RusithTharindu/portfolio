export type StackGroup = {
  group: string;
  items: string[];
};

export const stack: StackGroup[] = [
  { group: "Frontend Development", items: ["React.js", "Next.js", "JavaScript", "TypeScript", "Tailwind"] },
  { group: "Animation Libraries", items: ["Motion", "GSAP"] },
  { group: "Backend Development", items: ["Node.js", "Express", "Nest.js", "C#", "ASP.NET", "EF Core"] },
  { group: "Databases", items: ["MongoDB", "MySQL"] },
  { group: "Cloud Platforms", items: ["AWS", "Azure"] },
  { group: "Mobile Application Development", items: ["React Native"] },
  { group: "User Interface Designing", items: ["Figma", "Framer"] },
  { group: "Version Control", items: ["Git"] },
  { group: "Testing", items: ["Postman", "Insomnia"] },
  { group: "Tools I Use", items: ["Notion", "ClickUp", "Slack", "Canva", "Trello"] },
];
