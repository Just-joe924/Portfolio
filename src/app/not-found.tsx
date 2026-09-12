import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { navItems } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Page not found",
  // A 404 has nothing worth ranking, and an indexed one competes with the
  // pages that do.
  robots: { index: false, follow: true },
};

/**
 * Served for an unknown URL, and for a project slug that doesn't exist.
 *
 * A dead end is the one place a visitor is most likely to leave, so this offers
 * the whole nav rather than a lone "go home" link — the same list the sidebar
 * renders, so it can't fall out of step.
 */
export default function NotFound() {
  return (
    <Container className="py-20 md:py-28">
      <div className="max-w-prose">
        <p className="font-mono text-sm font-medium text-accent">404</p>

        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          This page doesn&rsquo;t exist
        </h1>

        <p className="mt-4 leading-relaxed text-muted">
          The link may be out of date, or I may have moved something. Here&rsquo;s everything else
          on the site.
        </p>
      </div>

      <ul className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3.5 text-sm font-medium transition-colors hover:border-accent/40 hover:bg-surface-raised"
            >
              <Icon className="h-[18px] w-[18px] shrink-0 text-accent" aria-hidden />
              {label}
              <ArrowRight
                className="ml-auto h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
