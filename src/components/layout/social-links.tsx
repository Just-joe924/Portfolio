import { Github, Instagram, Linkedin, Mail, type LucideIcon } from "lucide-react";

import { socialLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Instagram: Instagram,
  Email: Mail,
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {socialLinks.map(({ label, href }) => {
        const Icon = icons[label] ?? Mail;
        const external = href.startsWith("http");

        return (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
