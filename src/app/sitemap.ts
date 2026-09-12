import type { MetadataRoute } from "next";

import { navItems } from "@/lib/nav";
import { getProjects } from "@/lib/projects";
import { site } from "@/lib/site";

/**
 * Built from the same nav and project data the pages themselves render from,
 * so a new route or a new project can't be left out of the sitemap by
 * forgetting to add it in two places.
 *
 * Served at /sitemap.xml; robots.ts points crawlers at it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) => new URL(path, site.url).toString();

  const pages: MetadataRoute.Sitemap = navItems.map(({ href }) => ({
    url: url(href),
    lastModified,
    changeFrequency: "monthly",
    // The home page is the one worth ranking; the rest sit just below it.
    priority: href === "/" ? 1 : 0.8,
  }));

  const projects: MetadataRoute.Sitemap = getProjects().map((project) => ({
    url: url(`/projects/${project.slug}`),
    lastModified,
    // A finished case study rarely changes once it's written.
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...projects];
}
