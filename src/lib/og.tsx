import { readFileSync } from "node:fs";
import { extname, join } from "node:path";

// Not `next/og`: the copy of @vercel/og bundled with Next 14.2 builds its
// font path with path.join() on import.meta.url, which produces
// "file:\C:\..." on Windows and throws "Invalid URL" before any image is
// drawn. 0.6.8 fixes that (new URL(path, import.meta.url)) and is otherwise
// the same API. next.config.mjs keeps it external so its .ttf and .wasm
// siblings stay resolvable at runtime.
import { ImageResponse } from "@vercel/og";

import {
  BODY_FONT,
  BRAND,
  DISPLAY_FONT,
  DISPLAY_WEIGHT,
  INITIALS,
  loadBrandFonts,
} from "@/lib/brand";
import { site } from "@/lib/site";
import type { ResolvedProject } from "@/types/project";

/**
 * The social card, rendered to PNG at build time by Satori.
 *
 * Server-only, and deliberately separate from the route files: /opengraph-image
 * and /twitter-image are the same picture, and the project route renders a
 * variant of it, so the drawing lives in one place.
 *
 * Satori is not a browser. It supports a subset of flexbox and no cascade, so
 * every container below sets `display: flex` explicitly and every value is
 * inline. It also can't fetch a relative URL — images have to be inlined as
 * data URIs.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

/** null when the file isn't in public/ yet, so the card degrades instead of
 *  failing the build. Same contract as publicFileExists in lib/assets. */
function publicFileAsDataUrl(pathFromPublicRoot: string) {
  const relative = pathFromPublicRoot.replace(/^\//, "");
  const type = MIME[extname(relative).toLowerCase()];
  if (!type) return null;

  try {
    const file = readFileSync(join(process.cwd(), "public", relative));
    return `data:${type};base64,${file.toString("base64")}`;
  } catch {
    return null;
  }
}

type CardProps = {
  eyebrow: string;
  title: string;
  description: string;
  /** Inlined data URI, or null for the monogram fallback. */
  portrait?: string | null;
  tags?: string[];
};

function Card({ eyebrow, title, description, portrait, tags }: CardProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: 64,
        backgroundColor: BRAND.background,
        color: BRAND.foreground,
        fontFamily: BODY_FONT,
        // The same accent glow the site itself sits under.
        backgroundImage: `radial-gradient(circle at 78% 12%, ${BRAND.accent}26 0%, transparent 45%)`,
      }}
    >
      {/* Wordmark and domain — the recognisable part at a glance. */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: 14,
            border: `2px solid ${BRAND.accent}`,
            color: BRAND.accent,
            fontFamily: DISPLAY_FONT,
            fontWeight: DISPLAY_WEIGHT,
            fontSize: 24,
          }}
        >
          {INITIALS}
        </div>
        <div style={{ fontSize: 24, color: BRAND.muted }}>
          {site.url.replace(/^https?:\/\//, "")}
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, alignItems: "center", gap: 56, marginTop: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", width: 40, height: 3, backgroundColor: BRAND.accent }} />
            <div
              style={{
                fontSize: 24,
                color: BRAND.accent,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {eyebrow}
            </div>
          </div>

          <div
            style={{
              marginTop: 20,
              // Long project names have to come down a size or they wrap to
              // three lines and push the description off the card.
              fontSize: title.length > 26 ? 60 : 76,
              fontFamily: DISPLAY_FONT,
              fontWeight: DISPLAY_WEIGHT,
              lineHeight: 1.1,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>

          <div style={{ marginTop: 20, fontSize: 30, lineHeight: 1.4, color: BRAND.muted }}>
            {description}
          </div>

          {tags && tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 28 }}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    display: "flex",
                    padding: "8px 16px",
                    borderRadius: 999,
                    backgroundColor: BRAND.surface,
                    border: `1px solid ${BRAND.border}`,
                    color: BRAND.muted,
                    fontSize: 22,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        {portrait !== undefined && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 320,
              height: 400,
              borderRadius: 28,
              border: `1px solid ${BRAND.border}`,
              backgroundColor: BRAND.surface,
              color: BRAND.muted,
              fontFamily: DISPLAY_FONT,
              fontWeight: DISPLAY_WEIGHT,
              fontSize: 96,
              overflow: "hidden",
            }}
          >
            {portrait ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={portrait} alt="" width={320} height={400} style={{ objectFit: "cover" }} />
            ) : (
              INITIALS
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/** The card for every route except a project case study. */
export function renderPersonOgImage() {
  return new ImageResponse(
    (
      <Card
        eyebrow={site.role}
        title={site.name}
        // Not `tagline` — it opens with "Full-stack developer", which the
        // eyebrow already says two lines above.
        description={site.headline}
        portrait={publicFileAsDataUrl(site.portrait.src)}
      />
    ),
    { ...OG_SIZE, fonts: loadBrandFonts() },
  );
}

/** The case-study card: no photo, but the stack it was built with. */
export function renderProjectOgImage(project: ResolvedProject) {
  return new ImageResponse(
    (
      <Card
        eyebrow={`Project · ${project.year}`}
        title={project.title}
        description={project.tagline}
        tags={project.stack.slice(0, 5)}
      />
    ),
    { ...OG_SIZE, fonts: loadBrandFonts() },
  );
}
