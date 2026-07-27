"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { isNavLinkActive, siteNavLinks } from "@/lib/nav";
import { Star } from "@/components/star-mark";

/**
 * Mobile navigation. The bar stays a single compact row and the links live in
 * a panel that drops from it, so the header costs ~56px instead of three
 * stacked rows.
 */
export function SiteMobileMenu({
  showDashboardCta = true,
}: {
  showDashboardCta?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="flex items-center md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="site-mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-secondary"
      >
        {open ? (
          <X className="h-5 w-5" strokeWidth={1.75} />
        ) : (
          <Menu className="h-5 w-5" strokeWidth={1.75} />
        )}
      </button>

      {open && (
        <>
          <div
            id="site-mobile-menu"
            className="animate-page-enter absolute inset-x-0 top-full z-20 border-b border-border bg-card shadow-xl"
          >
            <nav aria-label="Primary" className="px-4 py-2 sm:px-6">
              <ul role="list" className="divide-y divide-border">
                {siteNavLinks.map((link) => {
                  const isActive = isNavLinkActive(link, pathname);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-2.5 py-3.5 font-serif text-lg tracking-[-0.015em] transition-colors",
                          isActive
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {isActive && <Star className="text-accent" />}
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {showDashboardCta && (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="mt-3 mb-4 block"
                >
                  <span className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-[15px] font-medium text-primary-foreground">
                    Open Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              )}
            </nav>

            {/* Scrim starts at the panel's bottom edge so the bar and panel
                stay clean rather than being tinted through. */}
            <div
              className="absolute inset-x-0 top-full h-screen bg-foreground/25"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
          </div>
        </>
      )}
    </div>
  );
}
