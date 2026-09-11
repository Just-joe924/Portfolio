"use client";

import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Instagram,
  Linkedin,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const profiles: { label: string; href: string; detail: string; icon: LucideIcon }[] = [
  { label: "GitHub", href: site.socials.github, detail: "Code and commit history", icon: Github },
  { label: "LinkedIn", href: site.socials.linkedin, detail: "Experience and education", icon: Linkedin },
  { label: "Instagram", href: site.socials.instagram, detail: "Mostly photography", icon: Instagram },
];

const headingClass = "text-xs font-medium uppercase tracking-wider text-muted";

export function ContactLinks({ className }: { className?: string }) {
  const addressRef = useRef<HTMLSpanElement>(null);

  return (
    <div className={cn("space-y-8", className)}>
      <section aria-labelledby="contact-email-heading">
        <h2 id="contact-email-heading" className={headingClass}>
          Email
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-w-0 items-center gap-2 font-medium transition-colors hover:text-accent"
          >
            <Mail className="h-4 w-4 shrink-0 text-muted" aria-hidden />
            <span ref={addressRef} className="break-all">
              {site.email}
            </span>
          </a>
          <CopyEmailButton addressRef={addressRef} />
        </div>
      </section>

      <section aria-labelledby="contact-elsewhere-heading">
        <h2 id="contact-elsewhere-heading" className={headingClass}>
          Elsewhere
        </h2>
        <ul className="mt-3 divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
          {profiles.map(({ label, href, detail, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-raised"
              >
                <Icon
                  className="h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-foreground"
                  aria-hidden
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{label}</span>
                  <span className="block text-xs text-muted">{detail}</span>
                </span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

type CopyState = "idle" | "copied" | "failed";

function CopyEmailButton({ addressRef }: { addressRef: React.RefObject<HTMLSpanElement> }) {
  const [state, setState] = useState<CopyState>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  async function copy() {
    let outcome: CopyState = "copied";
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      // No clipboard API (plain http) or permission denied: select the address
      // so copying it by hand is one keystroke away.
      const address = addressRef.current;
      if (address) window.getSelection()?.selectAllChildren(address);
      outcome = "failed";
    }

    setState(outcome);
    clearTimeout(resetTimer.current);
    // The failure note is longer, so leave it up long enough to read.
    resetTimer.current = setTimeout(() => setState("idle"), outcome === "failed" ? 6000 : 2500);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-2.5 text-xs font-medium text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
      >
        {state === "copied" ? (
          <Check className="h-3.5 w-3.5 text-accent" aria-hidden />
        ) : (
          <Copy className="h-3.5 w-3.5" aria-hidden />
        )}
        {state === "copied" ? "Copied" : "Copy"}
      </button>

      <p role="status" className={cn("w-full text-xs text-muted", state !== "failed" && "sr-only")}>
        {state === "copied" && "Email address copied to the clipboard."}
        {state === "failed" && "Couldn't reach the clipboard, so the address is selected. Press Ctrl+C (⌘C on a Mac) to copy it."}
      </p>
    </>
  );
}
