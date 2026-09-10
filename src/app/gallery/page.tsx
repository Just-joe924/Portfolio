import type { Metadata } from "next";

import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = { title: "Gallery" };

// Route stub so the navigation is complete. Stage 6 (feat/photo-gallery) fills it in.
export default function GalleryPage() {
  return <PageHeader title="Gallery" intro="The photography grid and lightbox land in stage 6." />;
}
