import type { Metadata } from "next";

import { ProjectFilter } from "@/components/projects/project-filter";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { getProjects, getStackTags } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full-stack web applications — e-commerce, workflow automation and student platforms — with write-ups on what each one taught me.",
};

export default function ProjectsPage() {
  const projects = getProjects();
  const tags = getStackTags();

  return (
    <>
      <PageHeader
        title="Projects"
        intro="Things I've built end to end. Each one has a write-up covering why it exists, what I actually made, and what it taught me."
      />

      <Container>
        <ProjectFilter projects={projects} tags={tags} />
      </Container>
    </>
  );
}
