import type { TimelineEntry } from "@/types/timeline";

/**
 * Authored order is display order — most recent first. No sorting, so if you add
 * an entry, put it where it belongs.
 */
export const timeline: TimelineEntry[] = [
  {
    period: "2026 — Present",
    title: "Software Engineer Intern",
    organisation: "KevaAI",
    kind: "work",
    points: [
      "Building the company's real estate web application, contributing 100+ commits across 20+ feature branches.",
      "Translating Figma designs into responsive interfaces with Next.js, TypeScript, React and Tailwind CSS.",
      "Developing APIs and backend endpoints, working across both sides of the stack rather than only the UI.",
      "Wrote the team's internal database schema migration guide, and technical documentation for third-party API integrations.",
    ],
  },
  {
    period: "March 2026",
    title: "MikroTik Certified Network Associate (MTCNA)",
    organisation: "MikroTik",
    kind: "certification",
  },
  {
    period: "2024 — 2027 (expected)",
    title: "BSc Computer Science",
    organisation: "Anchor University, Lagos",
    kind: "education",
    points: ["Currently in third year, with a 4.57 GPA."],
  },
];
