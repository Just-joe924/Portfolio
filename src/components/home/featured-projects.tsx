import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectCard } from "@/components/projects/project-card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getFeaturedProjects } from "@/lib/projects";

/** The two projects flagged `featured` in src/data/projects.ts. */
export function FeaturedProjects() {
  const featured = getFeaturedProjects();
  if (featured.length === 0) return null;

  return (
    <Container className="pb-4 pt-6 md:pt-10">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold tracking-tight">Selected work</h2>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
          >
            All projects
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {featured.map((project, index) => (
          <Reveal key={project.slug} delay={index * 90}>
            <ProjectCard project={project} className="h-full" />
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
