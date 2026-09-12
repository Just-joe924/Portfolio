import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Sidebar } from "@/components/layout/sidebar";
import { PersonJsonLd } from "@/components/json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { fontBody, fontDisplay } from "@/lib/fonts";
import { site } from "@/lib/site";

import "./globals.css";

/**
 * Site-wide defaults. Every page inherits these and overrides what it needs —
 * `template` wraps a page's own title, so a page only ever declares its own
 * name ("About") and gets "About — Oreoluwa Johnson".
 *
 * Canonical URLs are deliberately *not* set here: a canonical inherited by
 * every route would point them all at the home page. Each page declares its
 * own in `alternates.canonical`.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.socials.github }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    site.name,
    "software engineer",
    // Kept alongside the title above: it's the phrase people actually search
    // for, and it still describes the work.
    "full-stack developer",
    "web developer Lagos",
    "TypeScript developer",
    "React developer",
    "Next.js developer",
    "portfolio",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Let Google use the full OG image and an untruncated snippet.
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Stops iOS Safari turning stray numbers in the copy into phone links.
  formatDetection: { telephone: false, address: false, email: false },

  // The images themselves come from app/opengraph-image.tsx and
  // app/twitter-image.tsx — Next adds the URL, dimensions and type tags.
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: site.url,
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: next-themes sets the class on <html> before
    // React hydrates, which is a deliberate server/client mismatch.
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontBody.variable} ${fontDisplay.variable}`}>
        <PersonJsonLd />

        {/* Scroll reveals start hidden and are shown by JS; without JS they
            must never stay invisible. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AmbientBackground />
          <CursorGlow />

          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
          >
            Skip to content
          </a>

          <Sidebar />

          <div className="flex min-h-screen flex-col lg:pl-64">
            <MobileNav />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
