import type { Metadata } from "next";

import { PhotoGrid } from "@/components/gallery/photo-grid";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { photos } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Matchdays, campus, and the people around them — photographs by Oreoluwa Johnson.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Gallery"
        intro="Matchdays, campus, and the people who put up with a camera being pointed at them."
      />

      <Container className="pb-16">
        <PhotoGrid photos={photos} />
      </Container>
    </>
  );
}
