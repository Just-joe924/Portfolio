import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Contact" };

// Route stub so the navigation is complete. Stage 7 (feat/contact-form) fills it in.
export default function ContactPage() {
  return <PageHeader title="Contact" intro="The contact form lands in stage 7." />;
}
