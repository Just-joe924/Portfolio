import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Server-only — importing this from a "use client" module pulls node:fs into
 * the browser bundle and fails the build. Client components that need a blur
 * placeholder should import NEUTRAL_BLUR_DATA_URL from lib/blur instead.
 *
 * Checks whether a file is actually present in public/ so the UI can skip a
 * link or image instead of shipping a 404.
 *
 * Runs at build time for static pages: add the file, rebuild, and the button
 * or image appears with no code change.
 */
export function publicFileExists(pathFromPublicRoot: string) {
  const relative = pathFromPublicRoot.replace(/^\//, "");
  return existsSync(join(process.cwd(), "public", relative));
}
