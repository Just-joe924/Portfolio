import { Award, Briefcase, GraduationCap, type LucideIcon } from "lucide-react";

import { timeline } from "@/data/timeline";
import type { TimelineKind } from "@/types/timeline";

const icons: Record<TimelineKind, LucideIcon> = {
  work: Briefcase,
  education: GraduationCap,
  certification: Award,
};

const labels: Record<TimelineKind, string> = {
  work: "Work",
  education: "Education",
  certification: "Certification",
};

export function Timeline() {
  return (
    <ol className="relative">
      {timeline.map((entry, index) => {
        const Icon = icons[entry.kind];
        const isLast = index === timeline.length - 1;

        return (
          <li key={`${entry.title}-${entry.period}`} className="relative flex gap-4 sm:gap-6">
            {/* Rail: a node per entry, connected except on the last one. */}
            <div className="flex flex-col items-center">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-accent">
                <Icon className="h-[18px] w-[18px]" aria-hidden />
              </span>
              {!isLast && <span className="w-px flex-1 bg-border" aria-hidden />}
            </div>

            <div className={isLast ? "pb-1" : "pb-9"}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <p className="font-mono text-xs text-muted">{entry.period}</p>
                <span className="rounded bg-surface-raised px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted">
                  {labels[entry.kind]}
                </span>
              </div>

              <h3 className="mt-1.5 font-display text-base font-semibold">{entry.title}</h3>
              <p className="text-sm text-muted">{entry.organisation}</p>

              {entry.points && (
                <ul className="mt-3 space-y-1.5">
                  {entry.points.map((point) => (
                    <li
                      key={point}
                      className="relative max-w-prose pl-4 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-border"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
