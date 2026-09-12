"use client";

import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/projects/project-card";
import { cn } from "@/lib/utils";
import type { ResolvedProject } from "@/types/project";

const ALL = "All";

/**
 * Filter bar plus the grid it filters. They live in one client component
 * because the selected tag has to drive both; the projects arrive as plain
 * data resolved on the server.
 */
export function ProjectFilter({
  projects,
  tags,
}: {
  projects: ResolvedProject[];
  tags: string[];
}) {
  const [active, setActive] = useState(ALL);

  const visible = useMemo(
    () => (active === ALL ? projects : projects.filter((p) => p.stack.includes(active))),
    [projects, active],
  );

  return (
    <div>
      <div role="group" aria-label="Filter projects by stack" className="flex flex-wrap gap-2">
        {[ALL, ...tags].map((tag) => {
          const selected = tag === active;

          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActive(tag)}
              aria-pressed={selected}
              className={cn(
                "rounded-md border px-3 py-1.5 text-sm transition-colors",
                selected
                  ? "border-accent bg-accent/10 font-medium text-accent"
                  : "border-border text-muted hover:bg-surface-raised hover:text-foreground",
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Announce the count so filtering isn't silent to screen readers. */}
      <p aria-live="polite" className="mt-4 text-sm text-muted">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
        {active !== ALL && ` using ${active}`}
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {visible.map((project, index) => (
          <ProjectCard key={project.slug} project={project} priority={index < 2} />
        ))}
      </div>
    </div>
  );
}
