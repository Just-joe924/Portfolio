import { projects } from "@/data/projects";
import { publicFileExists } from "@/lib/assets";
import type { ResolvedProject } from "@/types/project";

/**
 * Server-only. Resolves the raw project data against what's actually in
 * public/, so components can be handed plain objects and never touch the
 * filesystem themselves — which matters because the projects grid is a client
 * component.
 */

function resolve(project: (typeof projects)[number]): ResolvedProject {
  return { ...project, hasCover: publicFileExists(project.cover.src) };
}

/** Newest first. Ties keep the order they're authored in. */
export function getProjects(): ResolvedProject[] {
  return projects.map(resolve).sort((a, b) => b.year - a.year);
}

export function getProject(slug: string): ResolvedProject | undefined {
  const match = projects.find((project) => project.slug === slug);
  return match && resolve(match);
}

export function getFeaturedProjects(limit = 2): ResolvedProject[] {
  return getProjects()
    .filter((project) => project.featured)
    .slice(0, limit);
}

/** Every stack tag in use, most common first, for the filter bar. */
export function getStackTags(): string[] {
  const counts = new Map<string, number>();

  for (const project of projects) {
    for (const tag of project.stack) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}
