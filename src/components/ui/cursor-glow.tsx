"use client";

import { useEffect } from "react";

/**
 * Lights up the background dots around the pointer, like a magnet dragging
 * glowing filings across the page.
 *
 * Writes --cursor-x / --cursor-y / --cursor-opacity onto :root; the .ambient-spotlight
 * layer in globals.css does the drawing. The position is eased rather than set
 * directly, so the light lags a little behind the cursor — that lag is what
 * makes it read as dragging rather than sticking.
 *
 * Mouse only (no cursor to follow on touch), off entirely under
 * prefers-reduced-motion, and faded out over text so it never fights reading.
 */

const TEXT_SELECTOR =
  "p, h1, h2, h3, h4, h5, h6, li, a, button, label, code, pre, blockquote, span, strong, em, input, textarea, select, td, th, summary";

/** How much of the remaining distance to close each frame. Lower drags more. */
const POSITION_EASING = 0.14;
const FADE_EASING = 0.09;

export function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let targetOpacity = 0;
    let opacity = 0;

    let frame = 0;
    let running = false;
    let seenPointer = false;

    const tick = () => {
      x += (targetX - x) * POSITION_EASING;
      y += (targetY - y) * POSITION_EASING;
      opacity += (targetOpacity - opacity) * FADE_EASING;

      root.style.setProperty("--cursor-x", `${x.toFixed(1)}px`);
      root.style.setProperty("--cursor-y", `${y.toFixed(1)}px`);
      root.style.setProperty("--cursor-opacity", opacity.toFixed(3));

      // Stop scheduling frames once everything has settled; a pointer move
      // starts it again. Leaving a rAF loop running forever costs battery.
      const settled =
        Math.abs(targetX - x) < 0.5 &&
        Math.abs(targetY - y) < 0.5 &&
        Math.abs(targetOpacity - opacity) < 0.004;

      if (settled) {
        running = false;
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      targetX = event.clientX;
      targetY = event.clientY;

      // Jump to the cursor on the very first move rather than flying in from
      // the top-left corner.
      if (!seenPointer) {
        seenPointer = true;
        x = targetX;
        y = targetY;
      }

      const element = event.target as Element | null;
      const overText = Boolean(element?.closest?.(TEXT_SELECTOR));
      targetOpacity = overText ? 0 : 1;

      start();
    };

    const onLeave = () => {
      targetOpacity = 0;
      start();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      root.style.removeProperty("--cursor-opacity");
    };
  }, []);

  return null;
}
