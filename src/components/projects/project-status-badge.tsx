import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/types/project";

const styles: Record<ProjectStatus, { label: string; className: string }> = {
  live: { label: "Live", className: "bg-accent/12 text-accent" },
  "in-progress": { label: "In progress", className: "bg-surface-raised text-muted" },
  archived: { label: "Archived", className: "bg-surface-raised text-muted" },
};

export function ProjectStatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const { label, className: tone } = styles[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide",
        tone,
        className,
      )}
    >
      {status === "live" && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />}
      {label}
    </span>
  );
}
