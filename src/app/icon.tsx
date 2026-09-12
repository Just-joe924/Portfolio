import { ImageResponse } from "@vercel/og";

import { BRAND, DISPLAY_FONT, DISPLAY_WEIGHT, INITIALS, loadBrandFonts } from "@/lib/brand";

/**
 * The browser-tab icon, generated rather than checked in as a binary — the
 * monogram then follows the palette in lib/brand instead of drifting out of
 * step with a .ico nobody can edit.
 *
 * Next emits <link rel="icon"> for this automatically; apple-icon.tsx beside it
 * covers the iOS home screen.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          borderRadius: 7,
          backgroundColor: BRAND.accent,
          color: BRAND.background,
          fontFamily: DISPLAY_FONT,
          fontWeight: DISPLAY_WEIGHT,
          // Tight at 32px: the two letters have to be pulled together to read
          // as a monogram rather than two separate marks.
          fontSize: 17,
          letterSpacing: -1,
        }}
      >
        {INITIALS}
      </div>
    ),
    { ...size, fonts: loadBrandFonts() },
  );
}
