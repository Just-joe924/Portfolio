import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { ContactLinks } from "@/components/contact/contact-links";
import { Status } from "@/components/home/status";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Typewriter } from "@/components/ui/typewriter";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} about internships, junior roles, freelance work or a project.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        intro="Internships, junior roles, freelance work, or a question about something I've built. The form goes straight to my inbox, and email works just as well."
      />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <section
              aria-labelledby="contact-form-heading"
              className="rounded-lg border border-border bg-surface p-5 sm:p-8"
            >
              <h2 id="contact-form-heading" className="font-display text-xl font-semibold tracking-tight">
                <Typewriter>Send a message</Typewriter>
              </h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </section>
          </Reveal>

          <Reveal delay={90}>
            <div className="space-y-8">
              <Status />
              <ContactLinks />
              <p className="text-sm text-muted">Based in {site.location} (WAT, UTC+1).</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
