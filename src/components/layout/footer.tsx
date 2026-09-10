import Link from "next/link";

import { SocialLinks } from "@/components/layout/social-links";
import { navItems } from "@/lib/nav";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between md:px-10">
        <div>
          <p className="font-display text-sm font-semibold">{site.name}</p>
          <p className="mt-1 text-sm text-muted">
            © {new Date().getFullYear()} — built with Next.js and Tailwind.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 lg:hidden">
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm text-muted hover:text-foreground">
              {label}
            </Link>
          ))}
        </nav>

        <SocialLinks className="-ml-2 sm:ml-0" />
      </div>
    </footer>
  );
}
