import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { ProjectCover } from "@/components/projects/project-cover";
import { ProjectLinks } from "@/components/projects/project-links";
import { ProjectStatusBadge } from "@/components/projects/project-status-badge";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { NEUTRAL_BLUR_DATA_URL } from "@/lib/blur";
import { getProject, getProjects } from "@/lib/projects";

type Params = { params: { slug: string } };

/** Every project becomes a static page at build time. */
export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
      images: project.hasCover ? [{ url: project.cover.src }] : undefined,
    },
  };
}

export default function ProjectPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <article>
      <Container className="pb-8 pt-10 md:pt-14">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            aria-hidden
          />
          All projects
        </Link>

        <Reveal className="mt-6">
          <div className="flex flex-wrap items-center gap-3">
            <ProjectStatusBadge status={project.status} />
            <span className="font-mono text-xs text-muted">{project.year}</span>
            <span className="text-xs text-muted">{project.role}</span>
          </div>

          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 max-w-prose text-lg text-muted">{project.tagline}</p>
        </Reveal>

        <Reveal delay={80} className="mt-7">
          <ProjectLinks project={project} />
        </Reveal>

        <Reveal delay={120} className="mt-9">
          <ProjectCover
            project={project}
            priority
            sizes="(max-width: 1280px) 92vw, 1100px"
            className="aspect-[16/9]"
          />
        </Reveal>
      </Container>

      <Container className="pt-4">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-14">
          <div className="space-y-10">
            <Reveal>
              <Section title="Summary">{project.summary}</Section>
            </Reveal>
            <Reveal>
              <Section title="The problem">{project.problem}</Section>
            </Reveal>
            <Reveal>
              <Section title="What I built">{project.build}</Section>
            </Reveal>

            <Reveal>
              <h2 className="font-display text-xl font-semibold tracking-tight">What it taught me</h2>
              <ul className="mt-4 space-y-3">
                {project.learnings.map((learning) => (
                  <li
                    key={learning}
                    className="relative max-w-prose pl-5 leading-relaxed text-muted before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent/60"
                  >
                    {learning}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Stack rail — sits alongside on desktop, above the fold's end on mobile. */}
          <Reveal className="lg:sticky lg:top-10 lg:self-start">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted">
              Stack
            </h2>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((tag) => (
                <li
                  key={tag}
                  className="rounded bg-surface-raised px-2.5 py-1 text-xs font-medium text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>

      {project.screenshots && project.screenshots.length > 0 && (
        <Container className="pt-14">
          <Reveal>
            <h2 className="font-display text-xl font-semibold tracking-tight">Screenshots</h2>
          </Reveal>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {project.screenshots.map((shot) => (
              <Reveal key={shot.src}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-border bg-surface-raised">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 640px) 92vw, 45vw"
                    placeholder="blur"
                    blurDataURL={NEUTRAL_BLUR_DATA_URL}
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      )}

      <Container className="pt-14">
        <Reveal className="rounded-lg border border-border bg-surface p-6 sm:p-8">
          <h2 className="font-display text-lg font-semibold tracking-tight">
            Want to see it running?
          </h2>
          <p className="mt-2 max-w-prose text-sm text-muted">
            The live site and source are linked below where they&rsquo;re available.
          </p>
          <ProjectLinks project={project} className="mt-5" />
        </Reveal>
      </Container>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 max-w-prose leading-relaxed text-muted">{children}</p>
    </div>
  );
}
