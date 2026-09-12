import { Container } from "@/components/ui/container";

/**
 * Shown while a route segment streams in. Most pages here are static, so it
 * appears mainly on a slow connection or a cold navigation — but without it the
 * screen just sits on the previous page with nothing to say anything is
 * happening.
 *
 * Shaped like PageHeader followed by a card grid, which is what most routes
 * render, so the layout barely moves when the real content arrives.
 */
export default function Loading() {
  return (
    <div role="status">
      <span className="sr-only">Loading…</span>

      {/* Placeholder geometry, of no interest to a screen reader — the
          sr-only line above is what it should read instead. */}
      <div aria-hidden>
        <Container className="pb-8 pt-12 md:pt-16">
          <div className="h-9 w-48 animate-pulse rounded-md bg-surface-raised md:h-10" />
          <div className="mt-5 h-4 w-full max-w-prose animate-pulse rounded bg-surface-raised" />
          <div className="mt-2.5 h-4 w-2/3 max-w-prose animate-pulse rounded bg-surface-raised" />
        </Container>

        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className="h-52 animate-pulse rounded-lg border border-border bg-surface"
                // Staggered so it reads as a page filling in rather than one
                // block flashing.
                style={{ animationDelay: `${index * 120}ms` }}
              />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
