import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "About" };

// Route stub so the navigation is complete. Stage 4 (feat/about-page) fills it in.
export default function AboutPage() {
  return <PageHeader title="About" intro="Bio, skills and timeline land in stage 4." />;
}
