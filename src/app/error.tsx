"use client";

import Link from "next/link";
import { RotateCcw, TriangleAlert } from "lucide-react";
import { useEffect } from "react";

import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

/**
 * The boundary for anything that throws while rendering a page. It replaces
 * only the page — the sidebar, nav and footer in the root layout survive, so
 * the visitor can still get somewhere else.
 *
 * `reset()` re-renders the segment without a full reload, which is enough to
 * recover from a one-off failure.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // No error-reporting service is wired up, so the console is where this
    // goes. In production React strips the message from the client bundle and
    // leaves only `digest`, which ties it to the server log.
    console.error(error);
  }, [error]);

  return (
    <Container className="py-20 md:py-28">
      <div className="max-w-prose">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-danger/10 text-danger">
          <TriangleAlert className="h-5 w-5" aria-hidden />
        </span>

        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Something went wrong
        </h1>

        <p className="mt-4 leading-relaxed text-muted">
          This page failed to load. It&rsquo;s almost certainly my fault rather than yours — trying
          again usually fixes it.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 items-center gap-2 rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-md border border-border-strong px-5 text-sm font-medium transition-colors hover:bg-surface-raised"
          >
            Back to home
          </Link>
        </div>

        <p className="mt-8 text-sm text-muted">
          If it keeps happening,{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-foreground underline underline-offset-2"
          >
            tell me about it
          </a>
          {error.digest && (
            <>
              {" "}
              and quote <code className="font-mono text-xs">{error.digest}</code>
            </>
          )}
          .
        </p>
      </div>
    </Container>
  );
}
