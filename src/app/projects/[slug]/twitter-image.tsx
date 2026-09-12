import { notFound } from "next/navigation";

import { OG_CONTENT_TYPE, OG_SIZE, renderProjectOgImage } from "@/lib/og";
import { getProject, getProjects } from "@/lib/projects";

/** Same card as opengraph-image beside it; see the note in app/twitter-image.tsx. */
export const alt = "Project case study";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return renderProjectOgImage(project);
}
