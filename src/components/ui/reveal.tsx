"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Fades and lifts its children into view the first time they're scrolled to.
 *
 * Degrades safely in three directions: without JavaScript a <noscript> rule in
 * the root layout forces the visible state, without IntersectionObserver it
 * shows immediately, and under prefers-reduced-motion globals.css pins it
 * visible so nothing ever animates.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Stagger sibling reveals, in milliseconds. Keep it under ~250. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setVisible(true);
          observer.disconnect();
        }
      },
      // Fire a little before the element is fully on screen.
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      data-visible={visible || undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
