import { OG_CONTENT_TYPE, OG_SIZE, renderPersonOgImage } from "@/lib/og";
import { site } from "@/lib/site";

/**
 * Same card as opengraph-image. X reads twitter:image in preference to
 * og:image, and only this file convention emits that tag.
 */
export const alt = `${site.name} — ${site.role}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderPersonOgImage();
}
