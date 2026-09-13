"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Types its text out one character at a time, with a caret that blinks at
 * whatever it has reached.
 *
 * The text is rendered plainly on the server and only split into per-character
 * spans after hydration, so crawlers, "view source" and anyone without
 * JavaScript get an ordinary heading. Splitting is also skipped outright when
 * the visitor has asked for reduced motion, which means screen readers usually
 * never meet the spans at all.
 *
 * Nothing is inserted or removed while typing — every character is present from
 * the start and merely transparent — so the line breaks where it always would
 * and the page never reflows underneath the reader.
 *
 * Children must be a plain string: the component reads `textContent` and
 * replaces it.
 */

type Entry = {
  el: HTMLElement;
  chars: HTMLElement[];
  caret: HTMLElement;
  /** Has it scrolled into view yet? Nothing types before it does. */
  seen: boolean;
  state: "idle" | "typing" | "done";
};

/**
 * Typing speed — the three dials worth touching.
 *
 * MS_PER_CHAR sets the pace: higher is slower. A fixed rate alone would make a
 * long paragraph outlast the reader's patience, so the total is clamped at both
 * ends — short headings never flash past, and long text quietly types faster
 * rather than holding the page hostage.
 */
const MS_PER_CHAR = 30;
const MIN_DURATION = 400;
const MAX_DURATION = 3000;

const entries = new Map<HTMLElement, Entry>();

/** One at a time, in document order, so the page reads as a single stream. */
let active: Entry | null = null;
/** Whoever the caret is parked on — the last thing typed, while it waits. */
let caretOwner: Entry | null = null;
let observer: IntersectionObserver | null = null;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getObserver() {
  observer ??= new IntersectionObserver(
    (records) => {
      for (const record of records) {
        if (!record.isIntersecting) continue;
        const entry = entries.get(record.target as HTMLElement);
        if (entry) entry.seen = true;
        observer?.unobserve(record.target);
      }
      pump();
    },
    // Start a little before the text is flush with the bottom edge, so it isn't
    // typing half off-screen.
    { rootMargin: "0px 0px -8% 0px" },
  );

  return observer;
}

function split(el: HTMLElement) {
  const text = el.textContent ?? "";
  const fragment = document.createDocumentFragment();
  const chars: HTMLElement[] = [];

  // Iterating the string rather than indexing it keeps accented characters and
  // anything outside the basic plane in one piece.
  for (const character of text) {
    const span = document.createElement("span");
    span.className = "tw-char";
    span.textContent = character;
    fragment.append(span);
    chars.push(span);
  }

  const caret = document.createElement("span");
  caret.className = "tw-caret";
  caret.setAttribute("aria-hidden", "true");

  el.replaceChildren(fragment, caret);
  return { chars, caret };
}

function takeCaret(entry: Entry) {
  if (caretOwner && caretOwner !== entry) delete caretOwner.el.dataset.caret;
  caretOwner = entry;
  entry.el.dataset.caret = "";
}

function type(entry: Entry) {
  active = entry;
  entry.state = "typing";
  takeCaret(entry);

  const total = entry.chars.length;
  const duration = Math.min(MAX_DURATION, Math.max(MIN_DURATION, total * MS_PER_CHAR));
  const started = performance.now();
  let shown = 0;

  const step = (now: number) => {
    const progress = Math.min(1, (now - started) / duration);
    const target = Math.ceil(progress * total);

    for (; shown < target; shown++) entry.chars[shown].dataset.on = "";

    // Once per frame rather than once per character: the caret sits just before
    // the first character still to come, which is exactly the typing position.
    // Past the last one, insertBefore(null) appends.
    entry.el.insertBefore(entry.caret, entry.chars[shown] ?? null);

    if (progress < 1) {
      requestAnimationFrame(step);
      return;
    }

    entry.state = "done";
    active = null;
    // Whatever is already on screen types next; the rest waits for a scroll.
    pump();
  };

  requestAnimationFrame(step);
}

function pump() {
  if (active) return;

  let next: Entry | null = null;
  for (const entry of entries.values()) {
    if (!entry.seen || entry.state !== "idle") continue;
    if (
      !next ||
      entry.el.compareDocumentPosition(next.el) & Node.DOCUMENT_POSITION_FOLLOWING
    ) {
      next = entry;
    }
  }

  if (next) type(next);
}

function register(el: HTMLElement) {
  // Reduced motion, or a second pass from React's development-mode double
  // effect: leave the text exactly as the server rendered it.
  if (prefersReducedMotion() || entries.has(el)) return;

  const { chars, caret } = split(el);
  entries.set(el, { el, chars, caret, seen: false, state: "idle" });
  getObserver().observe(el);
}

function unregister(el: HTMLElement) {
  const entry = entries.get(el);
  if (!entry) return;

  if (active === entry) active = null;
  if (caretOwner === entry) caretOwner = null;
  observer?.unobserve(el);
  entries.delete(el);
}

export function Typewriter({
  as: Tag = "span",
  className,
  children,
}: {
  /** The element to render. A span inside the real heading by default, so the
   *  heading's own semantics and styles stay where they are. */
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    register(el);
    return () => unregister(el);
  }, []);

  return (
    <Tag ref={ref} className={cn("typewriter", className)} suppressHydrationWarning>
      {children}
    </Tag>
  );
}
