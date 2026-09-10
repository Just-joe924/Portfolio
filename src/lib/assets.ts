import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Server-only. Checks whether a file is actually present in public/ so the UI
 * can skip a link instead of shipping a 404.
 *
 * This runs at build time for static pages, which means: add the file, rebuild,
 * and the button or image appears with no code change. Never import this from a
 * "use client" component.
 */
export function publicFileExists(pathFromPublicRoot: string) {
  const relative = pathFromPublicRoot.replace(/^\//, "");
  return existsSync(join(process.cwd(), "public", relative));
}

/**
 * A 74-byte neutral PNG used as the blur placeholder while the portrait loads.
 * Once the real photo is committed you can swap the <Image> to a static import
 * (`import portrait from "../../public/images/portrait.jpg"`) and Next will
 * generate a true blur from the image itself.
 */
export const NEUTRAL_BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAKCAIAAAAGpYjXAAAAEUlEQVR4nGNQ0zHAihiGuwQA1RcooZ5I/hIAAAAASUVORK5CYII=";
