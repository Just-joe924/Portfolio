import type { Metadata } from "next";

import { FeaturedProjects } from "@/components/home/featured-projects";
import { Hero } from "@/components/home/hero";

/**
 * The home page keeps the root layout's default title and description — they
 * were written for it. Only the canonical is page-specific.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
    </>
  );
}
