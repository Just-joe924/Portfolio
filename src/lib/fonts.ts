import { Inter, Sora } from "next/font/google";

/**
 * Two families, loaded and self-hosted by Next at build time — no render-blocking
 * <link> to Google and no layout shift. Swap the imports here to restyle the
 * whole site; nothing else references a font name.
 */

export const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const fontDisplay = Sora({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
