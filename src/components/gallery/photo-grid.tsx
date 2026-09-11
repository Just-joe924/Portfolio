"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { CategoryFilter } from "@/components/gallery/category-filter";
import { Lightbox } from "@/components/gallery/lightbox";
import type { Photo, PhotoFilter } from "@/types/photo";

/**
 * Rendered width of one column at each breakpoint, allowing for the sidebar
 * from lg and the page gutter — so phones never download a desktop-sized file.
 */
const SIZES =
  "(min-width: 1440px) 360px, (min-width: 1280px) 25vw, (min-width: 1024px) 36vw, (min-width: 640px) 46vw, 92vw";

/**
 * Filter bar, masonry grid and lightbox. They share one client component
 * because the selected category drives all three: the lightbox steps through
 * only the photos currently shown.
 *
 * The grid is CSS columns, so every photo keeps its natural aspect ratio with
 * no layout JavaScript.
 */
export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [filter, setFilter] = useState<PhotoFilter>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const triggers = useRef(new Map<string, HTMLButtonElement>());
  const lastOpenId = useRef<string | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? photos : photos.filter((photo) => photo.category === filter)),
    [photos, filter],
  );

  const counts = useMemo(() => {
    const result: Partial<Record<PhotoFilter, number>> = { all: photos.length };
    for (const photo of photos) result[photo.category] = (result[photo.category] ?? 0) + 1;
    return result;
  }, [photos]);

  const openIndex = openId === null ? -1 : visible.findIndex((photo) => photo.id === openId);

  // After the lightbox closes, return focus to the card of the photo it ended
  // on — which, after arrowing through, isn't the one that opened it.
  useEffect(() => {
    if (openId !== null) {
      lastOpenId.current = openId;
      return;
    }
    if (lastOpenId.current) {
      triggers.current.get(lastOpenId.current)?.focus();
      lastOpenId.current = null;
    }
  }, [openId]);

  return (
    <div>
      <CategoryFilter value={filter} counts={counts} onChange={setFilter} />

      <ul role="list" className="mt-5 gap-4 sm:columns-2 xl:columns-3">
        {visible.map((photo, index) => (
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
                <h2 className="font-display text-sm font-semibold tracking-tight">
                  {/* Stretched button: the whole card is the hit area, but its
                      accessible name is just the title. The focus ring moves
                      to the stretched overlay so it outlines the card. */}
                  <button
                    ref={(node) => {
                      if (node) triggers.current.set(photo.id, node);
                      else triggers.current.delete(photo.id);
                    }}
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => setOpenId(photo.id)}
                    className="text-left after:absolute after:inset-0 after:rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:after:ring-2 focus-visible:after:ring-ring focus-visible:after:ring-offset-2 focus-visible:after:ring-offset-background"
                  >
                    {photo.title}
                  </button>
                </h2>
                <p className="mt-0.5 text-sm leading-relaxed text-muted">{photo.caption}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {openIndex !== -1 && (
        <Lightbox
          photos={visible}
          index={openIndex}
          onNavigate={(index) => setOpenId(visible[index].id)}
          onClose={() => setOpenId(null)}
        />
      )}
    </div>
  );
}
