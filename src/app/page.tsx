import Link from "next/link";

import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

// Placeholder hero — stage 3 (feat/hero-section) replaces this with the real one,
// including the portrait, the status line and the featured projects strip.
export default function Home() {
  return (
    <Container className="py-20 md:py-28">
      <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-accent">
        {site.role}
      </p>

      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-6xl">
        Hi, I&rsquo;m {site.shortName}.
      </h1>

      <p className="mt-5 max-w-prose text-lg text-muted">{site.tagline}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/projects"
          className="inline-flex h-11 items-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
        >
          View projects
        </Link>
        <Link
          href="/contact"
          className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-medium transition-colors hover:bg-surface-raised"
        >
          Get in touch
        </Link>
      </div>
    </Container>
  );
}
