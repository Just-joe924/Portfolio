/**
 * Single source of truth for anything that appears in more than one place:
 * metadata, the footer, the sidebar, the hero, the contact page.
 *
 * All the site's prose lives here too — edit the copy in this file rather than
 * hunting through components for strings.
 */

export type SocialLink = {
  label: string;
  href: string;
};

export const site = {
  name: "Oreoluwa Johnson",
  shortName: "Joe",
  role: "Software engineer",
  tagline: "Software engineer, photographer, footballer.",

  /**
   * The meta description — what Google prints under the title and what
   * WhatsApp shows beneath a shared link. Different job from `tagline`, which
   * is display copy: this one wants 150–160 characters and the words someone
   * would actually search for.
   */
  description:
    "Oreoluwa Johnson is a software engineer in Lagos, Nigeria, building web applications with TypeScript, React, Next.js and Postgres. Projects, photography and contact.",
  email: "theemmanueljohnson@gmail.com",
  location: "Lagos, Nigeria",

  /**
   * The canonical origin. Everything absolute is built from it: canonical
   * links, the sitemap, og:url and the social card.
   *
   * It has to match the domain the site is actually served from, or Google
   * reads every page as a copy of one that doesn't resolve — so on Vercel set
   * NEXT_PUBLIC_SITE_URL to the deployment's own URL until the custom domain
   * is attached. The fallback is the domain on the CV.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://oreoluwajohnson.com").replace(/\/+$/, ""),

  /** The hero. Rewrite these two strings whenever the pitch changes. */
  headline: "I build full-stack web applications.",
  intro:
    "I'm Oreoluwa Johnson — Joe to most people. I'm a student developer who works across the whole stack: TypeScript, React and Next.js at the front, APIs and databases behind them. I care about software that people can actually use, and I ship it rather than leave it half-finished.",

  /** The "currently" line. Keep it current — a stale one is worse than none. */
  status: {
    text: "Open to full-stack internships, junior roles and freelance work",
    /** Set false when you stop looking; the dot and pill disappear with it. */
    available: true,
  },

  /**
   * Drop the PDF at public/<file> and the Download CV button appears on its own.
   * Until the file exists the button is skipped rather than serving a 404.
   */
  cv: {
    file: "oreoluwa-johnson-cv.pdf",
    label: "Download CV",
  },

  /**
   * Drop the photo at public/images/portrait.jpg and the hero swaps from the
   * placeholder to the real image automatically. Aim for at least 1200×1500.
   */
  portrait: {
    src: "/images/portrait.jpg",
    alt: "Oreoluwa Johnson",
    width: 1200,
    height: 1500,
  },

  socials: {
    github: "https://github.com/Just-joe924",
    instagram: "https://www.instagram.com/theemmanueljohnson/",
    linkedin: "https://www.linkedin.com/in/oreoluwa-johnson-540a2b35a",
  },
} as const;

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: site.socials.github },
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "Instagram", href: site.socials.instagram },
  { label: "Email", href: `mailto:${site.email}` },
].filter((link) => link.href.length > 0);
