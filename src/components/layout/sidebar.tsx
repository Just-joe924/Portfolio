import { NavLinks } from "@/components/layout/nav-links";
import { SocialLinks } from "@/components/layout/social-links";
import { Wordmark } from "@/components/layout/wordmark";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

/** Fixed left rail on large screens. Below lg the mobile bar takes over. */
export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-surface px-5 py-7 lg:flex">
      <div className="flex items-center justify-between">
        <Wordmark />
        <ThemeToggle />
      </div>

      <p className="mt-2 text-sm text-muted">{site.role}</p>

      <nav aria-label="Main" className="mt-8 flex-1">
        <NavLinks />
      </nav>

      <div className="border-t border-border pt-4">
        <SocialLinks className="-ml-2" />
        <p className="mt-3 px-2 text-xs text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </aside>
  );
}
