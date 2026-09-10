import type { SkillCategory } from "@/types/skill";

/**
 * Taken from your CV so the two never disagree — update both together.
 * Only list things you would be comfortable being questioned on in an interview.
 */
export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    note: "TypeScript is where I spend most of my time; C and C++ come from coursework.",
    items: ["TypeScript", "JavaScript", "HTML", "CSS", "C++", "C"],
  },
  {
    name: "Frameworks & libraries",
    note: "React and Next.js on the front, Express on the server.",
    items: ["React", "Next.js", "Express.js", "Tailwind CSS"],
  },
  {
    name: "Databases",
    note: "Schema design, migrations and row-level security, not just queries.",
    items: ["Supabase", "PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    name: "Practices",
    note: "The work that turns a UI into an application.",
    items: [
      "REST APIs",
      "API integration",
      "Authentication",
      "Database design",
      "Responsive web development",
    ],
  },
  {
    name: "Tools",
    note: "How the work actually gets shipped and tracked.",
    items: ["Git", "GitHub", "JIRA", "Figma", "VS Code"],
  },
];
