import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/**
 * Served at /robots.txt. Nothing here is private, so everything is crawlable —
 * the file exists mainly to advertise the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Next's API routes back the contact form's server action; there is no
      // page there to index.
      disallow: "/api/",
    },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
