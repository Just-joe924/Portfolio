"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { NavLinks } from "@/components/layout/nav-links";
import { SocialLinks } from "@/components/layout/social-links";
import { Wordmark } from "@/components/layout/wordmark";
import { ThemeToggle } from "@/components/theme-toggle";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const close = useCallback(() => setOpen(false), []);

  // Close on navigation — otherwise the drawer stays over the new page.
  useEffect(() => close(), [pathname, close]);

  // Escape closes, and the page behind must not scroll while it is open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <Wordmark />
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
          >
            <Menu className="h-[18px] w-[18px]" aria-hidden />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40">
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="absolute inset-0 h-full w-full bg-foreground/40"
          />
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className="absolute inset-y-0 right-0 flex w-72 max-w-[85%] flex-col border-l border-border bg-surface px-5 py-4 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <Wordmark />
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                autoFocus
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
              >
                <X className="h-[18px] w-[18px]" aria-hidden />
              </button>
            </div>

            <nav aria-label="Main" className="mt-8 flex-1">
              <NavLinks onNavigate={close} />
            </nav>

            <SocialLinks className="-ml-2 border-t border-border pt-4" />
          </div>
        </div>
      )}
    </div>
  );
}
