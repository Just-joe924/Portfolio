import Image from "next/image";

import { NEUTRAL_BLUR_DATA_URL } from "@/lib/blur";
import { cn } from "@/lib/utils";
import type { ResolvedProject } from "@/types/project";

/**
 * The project image, or a typographic panel when the screenshot isn't in
 * public/ yet — so a missing file looks deliberate rather than broken.
 */
export function ProjectCover({
  project,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: {
  project: ResolvedProject;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-md border border-border bg-surface-raised",
        className,
      )}
    >
      {project.hasCover ? (
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={NEUTRAL_BLUR_DATA_URL}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-6" aria-hidden>
          <span className="text-center font-display text-lg font-semibold text-muted/70">
            {project.title}
          </span>
        </div>
      )}
    </div>
  );
}
