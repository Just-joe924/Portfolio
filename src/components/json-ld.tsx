import { skillCategories } from "@/data/skills";
import { timeline } from "@/data/timeline";
import { site } from "@/lib/site";

/**
 * Person structured data.
 *
 * Tells Google the site is about a person rather than a company, and — through
 * `sameAs` — that this name, the GitHub account and the LinkedIn profile are
 * all the same someone. That's what lets a search for the name return the site
 * with the profiles attached rather than three unrelated results.
 *
 * Built from the same data the About page renders, so the schema can't quietly
 * disagree with what a visitor reads.
 */
function personSchema() {
  const education = timeline.find((entry) => entry.kind === "education");
  const currentRole = timeline.find(
    (entry) => entry.kind === "work" && /present/i.test(entry.period),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    // The generated social card doubles as the profile image.
    image: `${site.url}/opengraph-image`,
    jobTitle: site.role,
    description: site.description,
    email: `mailto:${site.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    knowsAbout: [...new Set(skillCategories.flatMap((category) => category.items))],
    sameAs: [site.socials.github, site.socials.linkedin, site.socials.instagram],
    ...(education && {
      alumniOf: { "@type": "CollegeOrUniversity", name: education.organisation },
    }),
    ...(currentRole && {
      worksFor: { "@type": "Organization", name: currentRole.organisation },
    }),
  };
}

export function PersonJsonLd() {
  return (
    <script
      type="application/ld+json"
      // A stringified value containing "</script>" would close the tag early.
      // Escaping "<" is the standard guard, and JSON parsers read < back
      // as the same character.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personSchema()).replace(/</g, "\\u003c"),
      }}
    />
  );
}
