"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";

import { NavLinks } from "@/components/layout/nav-links";
import { SocialLinks } from "@/components/layout/social-links";
import { Wordmark } from "@/components/layout/wordmark";
import { ThemeToggle } from "@/components/theme-toggle";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // Set only when the visitor dismissed the drawer themselves, so focus goes
  // back to the menu button then — but not when a navigation closed it, where
  // it belongs on the page that just loaded.
  const restoreFocus = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  const dismiss = useCallback(() => {
    restoreFocus.current = true;
    setOpen(false);
  }, []);

  // Close on navigation — otherwise the drawer stays over the new page.
  useEffect(() => close(), [pathname, close]);

  // Escape closes, and the page behind must not scroll while it is open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, dismiss]);

  // Move focus into the drawer when it opens, and back to the button that
  // opened it when the visitor closes it.
  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
      return;
    }

    if (restoreFocus.current) {
      restoreFocus.current = false;
      openButtonRef.current?.focus();
    }
  }, [open]);

  /**
   * aria-modal tells a screen reader to ignore the rest of the page, but it has
   * no effect on Tab — without this, tabbing past the last link walks into the
   * page behind the drawer while the drawer is still covering it.
   */
  function trapFocus(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;

    const controls = [...event.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE)];
    const first = controls[0];
    const last = controls[controls.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || active === event.currentTarget)) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return (
    <div className="lg:hidden">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <Wordmark />
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            ref={openButtonRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-strong text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
          >
            <Menu className="h-[18px] w-[18px]" aria-hidden />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40">
          {/* A dismiss target for taps outside the drawer, and nothing more. As
              a <button> it was a second "Close menu" control sitting ahead of
              the drawer in the tab order; keyboard users have Escape and the
              close button inside. */}
          <div aria-hidden onClick={dismiss} className="absolute inset-0 bg-foreground/40" />

          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            onKeyDown={trapFocus}
            className="absolute inset-y-0 right-0 flex w-72 max-w-[85%] flex-col border-l border-border bg-surface px-5 py-4 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <Wordmark />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={dismiss}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-strong text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
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
