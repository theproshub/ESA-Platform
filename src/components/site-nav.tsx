"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  // An in-page anchor, so it never takes the active marker.
  { label: "Features", href: "/#features", anchor: true },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  // The Open Dashboard button covers this from md up, where showing both
  // would put two links to /dashboard in the same bar. Below md that button
  // is hidden, so the nav carries the portal instead.
  { label: "Student Portal", href: "/dashboard", mobileOnly: true },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="flex items-stretch justify-center gap-6 sm:gap-8"
    >
      {navLinks.map((link) => {
        const isActive =
          !link.anchor &&
          (pathname === link.href || pathname.startsWith(`${link.href}/`));
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "group relative flex items-center py-3.5 text-[15px] transition-colors md:py-0",
              link.mobileOnly && "md:hidden",
              isActive
                ? "font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {link.label}
            {/* Overlaps the bar's 1px bottom border so the marker replaces that
                segment of the rule rather than hanging below it. */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 -bottom-px h-[2px] origin-left transition-transform duration-200 ease-out",
                isActive
                  ? "scale-x-100 bg-accent"
                  : "scale-x-0 bg-foreground/25 group-hover:scale-x-100"
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
