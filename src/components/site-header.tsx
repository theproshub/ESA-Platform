import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";
import { SiteMobileMenu } from "@/components/site-mobile-menu";

export function SiteHeader({
  /** Suppressed inside the dashboard, where "Open Dashboard" points at the
      page you are already on. */
  showDashboardCta = true,
  /** The dashboard hides this below md, where the sidebar's own bar already
      provides a mobile header and a menu button. */
  showOnMobile = true,
}: {
  showDashboardCta?: boolean;
  showOnMobile?: boolean;
}) {
  return (
    // Sticks by the height of the eyebrow strip, so that strip scrolls out of
    // view and the navigation bar pins to the top at every breakpoint.
    <header
      className={cn(
        "sticky -top-9 z-40",
        !showOnMobile && "hidden md:block"
      )}
    >
      {/* Institutional context. Fixed h-9 — the negative sticky offset above
          depends on it. */}
      <div className="bg-brand text-brand-foreground">
        <div className="mx-auto flex h-9 max-w-6xl items-center px-4 sm:px-6">
          <span className="label truncate text-brand-foreground/40">
            Stella Maris Polytechnic University
            <span className="hidden sm:inline">
              {" · "}Arthur Barclay Business College
            </span>
          </span>
        </div>
      </div>

      {/* 90% rather than a heavier frost: when the pinned bar sits over the
          navy hero, the tint showing through puts the muted nav links at
          3.99:1, under WCAG AA. 90% measures 4.93:1 and still reads as glass. */}
      <div className="relative border-b border-border bg-card/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-stretch gap-4 px-4 sm:px-6 md:h-[72px]">
          {/* One brand string across the site: the sidebar and the dashboard's
              mobile bar use the same monogram and wordmark. */}
          <Link href="/" className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="label flex h-8 w-9 shrink-0 items-center justify-center rounded-sm bg-brand text-brand-foreground"
            >
              ESA
            </span>
            <span className="font-serif text-[19px] font-semibold leading-none tracking-[-0.02em] md:text-xl">
              ESA Platform
            </span>
          </Link>

          <div className="ml-auto flex items-stretch gap-8">
            <SiteNav />
            {showDashboardCta && (
              <div className="hidden items-center md:flex">
                <Link href="/dashboard">
                  <Button className="h-9 gap-2 px-4">
                    Open Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
            <SiteMobileMenu showDashboardCta={showDashboardCta} />
          </div>
        </div>
      </div>
    </header>
  );
}
