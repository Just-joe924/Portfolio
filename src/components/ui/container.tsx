import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** The one place the page gutter and max width are defined. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-content px-5 md:px-10", className)}>{children}</div>
  );
}
