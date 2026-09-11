import { photoCategories } from "@/data/gallery";
import { cn } from "@/lib/utils";
import type { PhotoCategory, PhotoFilter } from "@/types/photo";

const options = [
  ["all", "All"],
  ...(Object.entries(photoCategories) as [PhotoCategory, string][]),
] satisfies [PhotoFilter, string][];

export function CategoryFilter({
  value,
  counts,
  onChange,
}: {
  value: PhotoFilter;
  counts: Partial<Record<PhotoFilter, number>>;
  onChange: (next: PhotoFilter) => void;
}) {
  const count = counts[value] ?? 0;

  return (
    <div>
      <div role="group" aria-label="Filter photographs by category" className="flex flex-wrap gap-2">
        {options.map(([id, label]) => {
          const selected = id === value;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-pressed={selected}
              className={cn(
                "inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors",
                selected
                  ? "border-accent bg-accent/10 font-medium text-accent"
                  : "border-border text-muted hover:bg-surface-raised hover:text-foreground",
              )}
            >
              {label}
              {/* Visual only — the live region below says the same thing once. */}
              <span aria-hidden className="font-mono text-[11px] opacity-70">
                {counts[id] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Announce the result so filtering isn't silent to screen readers. */}
      <p aria-live="polite" className="mt-4 text-sm text-muted">
        {count} {count === 1 ? "photograph" : "photographs"}
        {value !== "all" && ` in ${photoCategories[value]}`}
      </p>
    </div>
  );
}
