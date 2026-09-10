/**
 * Single source of truth for anything that appears in more than one place:
 * metadata, the footer, the sidebar, the contact page. Change it here only.
 */

export type SocialLink = {
  label: string;
  href: string;
};

export const site = {
  name: "Emmanuel Johnson",
  shortName: "Joe",
  role: "Developer",
  tagline: "Developer, photographer, footballer.",
  email: "theemmanueljohnson@gmail.com",
  // TODO: set this to the real domain once Vercel is wired up in stage 9.
  url: "https://portfolio-just-joe924.vercel.app",
  socials: {
    github: "https://github.com/Just-joe924",
    instagram: "https://www.instagram.com/theemmanueljohnson/",
    // TODO: paste your LinkedIn profile URL here. While it is empty the icon
    // is skipped rather than rendering a dead link.
    linkedin: "",
  },
} as const;

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: site.socials.github },
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "Instagram", href: site.socials.instagram },
  { label: "Email", href: `mailto:${site.email}` },
].filter((link) => link.href.length > 0);
