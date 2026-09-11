import Image from "next/image";

import type { Photo } from "@/types/photo";

/**
 * Rendered width of one column at each breakpoint, allowing for the sidebar
 * from lg and the page gutter — so phones never download a desktop-sized file.
 */
const SIZES =
  "(min-width: 1440px) 360px, (min-width: 1280px) 25vw, (min-width: 1024px) 36vw, (min-width: 640px) 46vw, 92vw";

/**
 * Masonry-style grid: CSS columns keep every photo at its natural aspect ratio
 * and fill down each column, with no layout JavaScript.
 */
export function PhotoGrid({ photos }: { photos: Photo[] }) {
  return (
    <ul role="list" className="gap-4 sm:columns-2 xl:columns-3">
      {photos.map((photo, index) => (
        <li key={photo.id} className="mb-4 break-inside-avoid">
          <figure className="group relative rounded-lg border border-border bg-surface p-2 transition-colors hover:border-accent/40">
            <div className="overflow-hidden rounded-md bg-surface-raised">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes={SIZES}
                placeholder="blur"
                blurDataURL={photo.blurDataURL}
                priority={index < 2}
                className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>

            <figcaption className="px-1 pb-1 pt-3">
              <h2 className="font-display text-sm font-semibold tracking-tight">{photo.title}</h2>
              <p className="mt-0.5 text-sm leading-relaxed text-muted">{photo.caption}</p>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
