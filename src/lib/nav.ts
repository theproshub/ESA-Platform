/** Public site navigation, shared by the desktop bar and the mobile menu. */
export const siteNavLinks = [
  // An in-page anchor, so it never takes the active marker.
  { label: "Features", href: "/#features", anchor: true },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type SiteNavLink = (typeof siteNavLinks)[number];

export function isNavLinkActive(
  link: { href: string; anchor?: boolean },
  pathname: string
) {
  if (link.anchor) return false;
  return pathname === link.href || pathname.startsWith(`${link.href}/`);
}
