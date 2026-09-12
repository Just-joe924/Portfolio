import { notFound } from "next/navigation";

import { OG_CONTENT_TYPE, OG_SIZE, renderProjectOgImage } from "@/lib/og";
import { getProject, getProjects } from "@/lib/projects";

/**
 * A per-project card, so sharing a case study shows that project's name and
 * stack rather than the generic site image.
 */
export const alt = "Project case study";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** Image routes need their own copy of this — without it the card is rendered
 *  on demand every time a scraper asks for it instead of at build time. */
export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return renderProjectOgImage(project);
}
