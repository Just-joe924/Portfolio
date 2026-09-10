"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isActiveRoute, navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";

/**
 * Rendered by both the desktop sidebar and the mobile drawer. The active item
 * comes from the current URL, so there is no `class="active"` to maintain by hand.
 */
export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-1">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = isActiveRoute(pathname, href);

        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-accent/10 font-medium text-accent"
                  : "text-muted hover:bg-surface-raised hover:text-foreground",
              )}
            >
              <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
