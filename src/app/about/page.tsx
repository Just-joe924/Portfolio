import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

import { SkillGrid } from "@/components/about/skill-grid";
import { Timeline } from "@/components/about/timeline";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { publicFileExists } from "@/lib/assets";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} — Computer Science student and full-stack developer in Lagos, Nigeria.`,
};

/** The bio. Edit these four strings; everything else on the page is data-driven. */
const bio = [
  "I'm Oreoluwa Johnson — Joe to most people. I'm a Computer Science undergraduate at Anchor University in Lagos, and a full-stack developer who works in TypeScript across React, Next.js and Express.",
  "Right now I'm a full-stack software developer intern at KevaAI, building their real estate web application. It's where I learned what shipping actually looks like: over a hundred commits across twenty-odd feature branches, Figma designs turned into working interfaces, API endpoints written to support them, and a database schema migration guide I wrote so the rest of the team had conventions to follow rather than folklore.",
  "Outside work I build things end to end. Cara is a full-stack fashion store with a Supabase Postgres schema behind it — row-level security, triggers, an Express order-finalisation endpoint. I've automated university admission letters with templated PDF generation and email delivery, and built a payments dashboard for a departmental platform serving over 200 students. The pattern I keep coming back to is the same: take something people currently do by hand, and make the software do it properly.",
  "Away from the keyboard I shoot photography and play football — I picked up a league title and medal in the 2024/2025 AUPL season. Both feed the same habit as the code, which is paying attention to details other people walk past.",
];

export default function AboutPage() {
  const cvHref = `/${site.cv.file}`;
  const hasCv = publicFileExists(cvHref);

  return (
    <>
      <PageHeader
        title="About"
        intro="Computer Science student, full-stack developer, and a fairly committed photographer."
      />

      <Container className="pb-4">
        <div className="max-w-prose space-y-5 text-base leading-relaxed">
          {bio.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        {hasCv && (
          <a
            href={cvHref}
            download
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-medium transition-colors hover:bg-surface-raised"
          >
            <Download className="h-4 w-4" aria-hidden />
            {site.cv.label}
          </a>
        )}
      </Container>

      <Container className="pt-14">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Skills</h2>
        <p className="mt-2 max-w-prose text-muted">
          What I reach for, and what I&rsquo;d be comfortable being questioned on.
        </p>
        <div className="mt-6">
          <SkillGrid />
        </div>
      </Container>

      <Container className="pt-14">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Experience & education</h2>
        <div className="mt-8">
          <Timeline />
        </div>
      </Container>

      <Container className="pt-14">
        <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            When I&rsquo;m not writing code
          </h2>
          <p className="mt-3 max-w-prose text-muted">
            I shoot photography — matchdays, campus, people I know — and I play football. The
            gallery is the honest version of what I do with the rest of my time: league seasons,
            student-week events, and the friends who put up with a camera being pointed at them.
          </p>
          <Link
            href="/gallery"
            className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover"
          >
            See the gallery
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </Container>
    </>
  );
}
