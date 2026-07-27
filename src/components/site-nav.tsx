"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Star } from "@/components/star-mark";

const navLinks = [
  // An in-page anchor, so it never takes the active marker.
  { label: "Features", href: "/#features", anchor: true },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Student Portal", href: "/dashboard" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Utility links"
      // Tight mobile gap keeps all four links on one line down to ~360px;
      // below that the row wraps to two centred lines rather than overflowing.
      className="label flex w-full flex-wrap items-center justify-center gap-x-2.5 gap-y-1 sm:w-auto sm:flex-nowrap sm:justify-end sm:gap-6"
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
              "flex items-center gap-1.5 transition-colors",
              isActive
                ? "text-brand-foreground"
                : "text-brand-foreground/50 hover:text-brand-foreground"
            )}
          >
            {isActive && <Star className="h-2 w-2 text-accent" />}
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
