import { Camera, FolderGit2, Home, Mail, User, type LucideIcon } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

/** The one list the sidebar, the mobile drawer and the footer all render from. */
export const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/projects", label: "Projects", icon: FolderGit2 },
  { href: "/gallery", label: "Gallery", icon: Camera },
  { href: "/contact", label: "Contact", icon: Mail },
];

/** `/` should only be active on exactly `/`; every other route matches its subtree. */
export function isActiveRoute(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
