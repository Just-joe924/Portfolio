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
  role: "Full-stack developer",
  tagline: "Full-stack developer, photographer, footballer.",
  email: "theemmanueljohnson@gmail.com",
  location: "Lagos, Nigeria",
  // Domain from your CV — point it at Vercel in stage 9.
  url: "https://oreoluwajohnson.com",

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
