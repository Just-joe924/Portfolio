"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image, { getImageProps } from "next/image";
import { useEffect, useId, useRef, type KeyboardEvent, type MouseEvent } from "react";

import type { Photo } from "@/types/photo";

const SIZES = "100vw";
const SWIPE_DISTANCE = 50;
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen photo viewer on the native <dialog>. showModal() makes the rest
 * of the page inert — unreachable by pointer, keyboard and screen reader — and
 * Tab is wrapped on top of that so focus cycles through the controls instead
 * of escaping to the browser toolbar.
 *
 * Arrow keys and swipes move between photos, Escape closes. Returning focus is
 * the parent's job, because only it knows which card the viewer ended on.
 */
export function Lightbox({
  photos,
  index,
  onNavigate,
  onClose,
}: {
  photos: Photo[];
  index: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipeStartX = useRef<number | null>(null);
  const titleId = useId();
  const captionId = useId();

  const photo = photos[index];
  const count = photos.length;
  const previous = (index - 1 + count) % count;
  const next = (index + 1) % count;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus();

    // Lock the page behind, padding for the scrollbar that disappears so the
    // layout doesn't jump sideways.
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    return () => {
      // Closing here too keeps Strict Mode's mount-unmount-mount from calling
      // showModal() on a dialog that's already open.
      dialog.close();
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, []);

  // Warm the cache for both neighbours so arrowing through is instant.
  useEffect(() => {
    for (const neighbour of new Set([photos[previous], photos[next]])) {
      const { props } = getImageProps({ src: neighbour.src, alt: "", fill: true, sizes: SIZES });
      const preload = new window.Image();
      preload.sizes = props.sizes ?? "";
      preload.srcset = props.srcSet ?? "";
      preload.src = props.src;
    }
  }, [photos, previous, next]);

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    // Leave browser shortcuts such as Alt+Left (back) alone.
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      if (count > 1) onNavigate(event.key === "ArrowLeft" ? previous : next);
      return;
    }

    if (event.key !== "Tab") return;

    const dialog = event.currentTarget;
    const controls = [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE)];
    const first = controls[0];
    const last = controls[controls.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || active === dialog)) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  // Clicks on the dark area around the photo close it; clicks on the photo don't.
  function closeOnBackdrop(event: MouseEvent<HTMLElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  if (!photo) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={captionId}
      // Focusable itself so a click on empty space keeps key handling inside.
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onCancel={(event) => {
        // Escape. Let React state close it rather than the browser.
        event.preventDefault();
        onClose();
      }}
      // A photograph is always shown on a dark stage, whatever the site theme.
      // The blur stops page text ghosting through behind the controls.
      className="m-0 h-full max-h-none w-full max-w-none border-0 bg-black/90 p-0 text-white outline-none backdrop-blur-md backdrop:bg-transparent"
    >
      <div className="flex h-full animate-fade-up flex-col gap-3 p-3 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p aria-hidden className="pl-2 font-mono text-xs text-white/70">
            {index + 1} / {count}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/10"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        {/* A size container, so the frame below can fit the photo to whichever
            of the stage's width or height runs out first. */}
        <div
          onClick={closeOnBackdrop}
          onPointerDown={(event) => {
            if (event.pointerType === "touch") swipeStartX.current = event.clientX;
          }}
          onPointerUp={(event) => {
            if (swipeStartX.current === null) return;
            const distance = event.clientX - swipeStartX.current;
            swipeStartX.current = null;
            if (count > 1 && Math.abs(distance) > SWIPE_DISTANCE) {
              onNavigate(distance < 0 ? next : previous);
            }
          }}
          onPointerCancel={() => (swipeStartX.current = null)}
          className="relative flex min-h-0 flex-1 items-center justify-center [container-type:size] [touch-action:pan-y_pinch-zoom]"
        >
          <div
            className="relative overflow-hidden rounded-sm"
            style={{
              aspectRatio: `${photo.width} / ${photo.height}`,
              width: `min(100cqw, 100cqh * ${photo.width / photo.height})`,
            }}
          >
            <Image
              // Remount per photo so each one gets its own blur-up.
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={SIZES}
              priority
              placeholder="blur"
              blurDataURL={photo.blurDataURL}
              style={{ objectFit: "cover" }}
            />
          </div>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => onNavigate(previous)}
                aria-label={`Previous photograph: ${photos[previous].title}`}
                className="absolute left-0 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 backdrop-blur transition-colors hover:bg-black/75"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => onNavigate(next)}
                aria-label={`Next photograph: ${photos[next].title}`}
                className="absolute right-0 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 backdrop-blur transition-colors hover:bg-black/75"
              >
                <ChevronRight className="h-6 w-6" aria-hidden />
              </button>
            </>
          )}
        </div>

        <div className="mx-auto w-full max-w-prose px-2 pb-1 text-center">
          <h2 id={titleId} className="font-display text-lg font-semibold tracking-tight">
            {photo.title}
          </h2>
          <p id={captionId} className="mt-1 text-sm leading-relaxed text-white/75">
            {photo.caption}
          </p>
        </div>

        {/* Arrowing changes the photo without moving focus, so say where we are. */}
        <p aria-live="polite" className="sr-only">
          Photograph {index + 1} of {count}: {photo.title}
        </p>
      </div>
    </dialog>
  );
}
