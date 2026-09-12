import { ImageResponse } from "@vercel/og";

import { BRAND, DISPLAY_FONT, DISPLAY_WEIGHT, INITIALS, loadBrandFonts } from "@/lib/brand";

/**
 * The iOS home-screen icon. Apple rounds the corners itself and shows it at
 * 180px, so this one is drawn square with generous padding.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: BRAND.accent,
          color: BRAND.background,
          fontFamily: DISPLAY_FONT,
          fontWeight: DISPLAY_WEIGHT,
          fontSize: 84,
          letterSpacing: -4,
        }}
      >
        {INITIALS}
      </div>
    ),
    { ...size, fonts: loadBrandFonts() },
  );
}
