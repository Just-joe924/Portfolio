import { ArrowUpRight, Github } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

/**
 * Live and repository buttons. Each is skipped when its URL is empty, so an
 * unpublished project simply shows fewer buttons instead of a dead link.
 */
export function ProjectLinks({
  project,
  className,
}: {
  project: Pick<Project, "title" | "liveUrl" | "repoUrl">;
  className?: string;
}) {
  const { liveUrl, repoUrl, title } = project;
  if (!liveUrl && !repoUrl) return null;

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-11 items-center gap-2 rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          Visit live site
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden
          />
          <span className="sr-only">({title}, opens in a new tab)</span>
        </a>
      )}

      {repoUrl && (
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-md border border-border-strong px-5 text-sm font-medium transition-colors hover:bg-surface-raised"
        >
          <Github className="h-4 w-4" aria-hidden />
          View code
          <span className="sr-only">({title}, opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}
