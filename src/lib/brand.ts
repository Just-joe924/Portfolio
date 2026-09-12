import { readFileSync } from "node:fs";
import { join } from "node:path";

import { site } from "@/lib/site";

/**
 * Shared look for the images generated at build time — the social cards and the
 * icons. Server-only: it reads font files from disk.
 *
 * None of this can come from globals.css or next/font. A PNG is baked once and
 * then shown inside WhatsApp, a browser tab or a phone home screen, none of
 * which have a theme or a font stack for it to inherit. The colours mirror the
 * dark-mode tokens and the fonts are the same two families the pages use, so a
 * generated image still looks like the site. Keep them in step by hand.
 */

export const BRAND = {
  background: "#0f1014",
  surface: "#1e2127",
  foreground: "#eef3f2",
  muted: "#9aa5a8",
  accent: "#5ec5b0",
  border: "#2c3038",
} as const;

/** "OJ" — the monogram on the icons and in the corner of the social card. */
export const INITIALS = site.name
  .split(" ")
  .map((part) => part[0])
  .join("");

/** Registered font names, used as `fontFamily` values in the generated images. */
export const BODY_FONT = "Inter";
export const DISPLAY_FONT = "Sora";
export const DISPLAY_WEIGHT = 600;

/**
 * Satori has no system fonts to fall back on, and the single face @vercel/og
 * bundles is one regular weight — set `fontWeight: 600` against it and nothing
 * happens, which is why these are loaded explicitly.
 *
 * src/assets/fonts holds only the two static instances the images need; the web
 * pages get theirs from next/font.
 */
export function loadBrandFonts() {
  const dir = join(process.cwd(), "src", "assets", "fonts");

  try {
    return [
      {
        name: BODY_FONT,
        data: readFileSync(join(dir, "Inter-Regular.ttf")),
        weight: 400 as const,
        style: "normal" as const,
      },
      {
        name: DISPLAY_FONT,
        data: readFileSync(join(dir, "Sora-SemiBold.ttf")),
        weight: DISPLAY_WEIGHT as 600,
        style: "normal" as const,
      },
    ];
  } catch {
    // Better an image in the default face than a failed build.
    return undefined;
  }
}
