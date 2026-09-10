import Link from "next/link";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-baseline gap-2 font-display text-lg font-semibold tracking-tight",
        className,
      )}
    >
      {site.shortName}
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
      <span className="sr-only">{site.name} — home</span>
    </Link>
  );
}
