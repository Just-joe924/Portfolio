import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectCover } from "@/components/projects/project-cover";
import { ProjectStatusBadge } from "@/components/projects/project-status-badge";
import { cn } from "@/lib/utils";
import type { ResolvedProject } from "@/types/project";

export function ProjectCard({
  project,
  priority = false,
  className,
}: {
  project: ResolvedProject;
  priority?: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent/40",
        className,
      )}
    >
      <ProjectCover
        project={project}
        priority={priority}
        sizes="(max-width: 640px) 92vw, (max-width: 1280px) 45vw, 520px"
      />

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-center gap-3">
          <ProjectStatusBadge status={project.status} />
          <span className="font-mono text-xs text-muted">{project.year}</span>
        </div>

        <h3 className="mt-2 font-display text-lg font-semibold tracking-tight">
          {/* Stretched link: the whole card is the hit area, but only the
              title is a link for screen readers and keyboard users. */}
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
            {project.title}
          </Link>
        </h3>

        <p className="mt-1.5 text-sm leading-relaxed text-muted">{project.tagline}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tag) => (
            <li
              key={tag}
              className="rounded bg-surface-raised px-2 py-0.5 text-[11px] font-medium text-muted"
            >
              {tag}
            </li>
          ))}
          {project.stack.length > 4 && (
            <li className="px-1 py-0.5 text-[11px] text-muted">
              +{project.stack.length - 4}
            </li>
          )}
        </ul>

        <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          Read the case study
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </p>
      </div>
    </article>
  );
}
