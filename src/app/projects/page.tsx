import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Projects" };

// Route stub so the navigation is complete. Stage 5 (feat/projects-showcase) fills it in.
export default function ProjectsPage() {
  return <PageHeader title="Projects" intro="The project grid and case studies land in stage 5." />;
}
