"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { isNavLinkActive, siteNavLinks } from "@/lib/nav";

/** Desktop navigation. Below md the mobile menu takes over. */
export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="hidden items-stretch gap-8 md:flex"
    >
      {siteNavLinks.map((link) => {
        const isActive = isNavLinkActive(link, pathname);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "group relative flex items-center text-[15px] transition-colors",
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
