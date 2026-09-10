import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";

import { Status } from "@/components/home/status";
import { Container } from "@/components/ui/container";
import { NEUTRAL_BLUR_DATA_URL, publicFileExists } from "@/lib/assets";
import { site } from "@/lib/site";

const initials = site.name
  .split(" ")
  .map((part) => part[0])
  .join("");

export function Hero() {
  // Both assets are optional: the CV button and the photo appear on their own
  // once the files land in public/. See src/lib/assets.ts.
  const hasPortrait = publicFileExists(site.portrait.src);
  const cvHref = `/${site.cv.file}`;
  const hasCv = publicFileExists(cvHref);

  return (
    <Container className="py-12 sm:py-20 lg:py-28">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div>
          <Status className="animate-fade-up" />

          <h1
            className="mt-5 animate-fade-up font-display text-[2rem] font-semibold leading-[1.1] tracking-tight sm:mt-6 sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "60ms" }}
          >
            {site.headline}
          </h1>

          <p
            className="mt-5 max-w-prose animate-fade-up text-base leading-relaxed text-muted sm:mt-6 sm:text-lg"
            style={{ animationDelay: "120ms" }}
          >
            {site.intro}
          </p>

          <div
            className="mt-8 flex animate-fade-up flex-wrap gap-3 sm:mt-10"
            style={{ animationDelay: "180ms" }}
          >
            <Link
              href="/projects"
              className="group inline-flex h-11 items-center gap-2 rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              View projects
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>

            {hasCv && (
              <a
                href={cvHref}
                download
                className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-medium transition-colors hover:bg-surface-raised"
              >
                <Download className="h-4 w-4" aria-hidden />
                {site.cv.label}
              </a>
            )}

            <Link
              href="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-5 text-sm font-medium transition-colors hover:bg-surface-raised"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Get in touch
            </Link>
          </div>
        </div>

        {/* Compact avatar on phones so the headline stays above the fold;
            a full portrait column from lg upwards. */}
        <div
          className="order-first animate-fade-up lg:order-none lg:justify-self-end"
          style={{ animationDelay: "240ms" }}
        >
          <div className="relative h-24 w-24 overflow-hidden rounded-full border border-border bg-surface-raised sm:h-28 sm:w-28 lg:h-auto lg:aspect-[4/5] lg:w-full lg:max-w-sm lg:rounded-2xl">
            {hasPortrait ? (
              <Image
                src={site.portrait.src}
                alt={site.portrait.alt}
                fill
                priority
                sizes="(max-width: 1024px) 112px, 384px"
                placeholder="blur"
                blurDataURL={NEUTRAL_BLUR_DATA_URL}
                className="object-cover"
              />
            ) : (
              <span
                className="absolute inset-0 flex items-center justify-center font-display text-2xl font-semibold text-muted lg:text-5xl"
                aria-hidden
              >
                {initials}
              </span>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
