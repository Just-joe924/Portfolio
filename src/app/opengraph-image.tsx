import { OG_CONTENT_TYPE, OG_SIZE, renderPersonOgImage } from "@/lib/og";
import { site } from "@/lib/site";

/**
 * The image behind every link to this site that isn't a project case study —
 * WhatsApp, LinkedIn, Slack and X all read it from the og:image tag Next
 * generates from this file.
 */
export const alt = `${site.name} — ${site.role}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderPersonOgImage();
}
