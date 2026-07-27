export type SiteNavLink = {
  label: string;
  href: string;
  /** Points into a page rather than at a destination. */
  anchor?: boolean;
};

/** Public site navigation, shared by the desktop bar and the mobile menu. */
export const siteNavLinks: readonly SiteNavLink[] = [
  { label: "Features", href: "/#features", anchor: true },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function isNavLinkActive(
  link: { href: string; anchor?: boolean },
  pathname: string
) {
  if (link.anchor) return false;
  return pathname === link.href || pathname.startsWith(`${link.href}/`);
}
