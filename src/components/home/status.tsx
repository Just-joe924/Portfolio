import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The "currently" line. Small, but it is the difference between a portfolio that
 * looks live and one that looks abandoned — so keep site.status.text honest.
 */
export function Status({ className }: { className?: string }) {
  if (!site.status.available) return null;

  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-3.5 py-1.5",
        "text-xs font-medium text-muted sm:text-sm",
        className,
      )}
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      {site.status.text}
    </p>
  );
}
