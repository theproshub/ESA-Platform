import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";
import { SiteMobileMenu } from "@/components/site-mobile-menu";
import { DashboardNavToggle } from "@/components/dashboard-nav";

export function SiteHeader({
  /** Suppressed inside the dashboard, where "Open Dashboard" points at the
      page you are already on. */
  showDashboardCta = true,
  /** Suppressed inside the dashboard, where the sidebar drawer is the single
      mobile menu and carries the site links itself. */
  showMobileMenu = true,
}: {
  showDashboardCta?: boolean;
  showMobileMenu?: boolean;
}) {
  return (
    // Sticks by the height of the eyebrow strip, so that strip scrolls out of
    // view and the navigation bar pins to the top at every breakpoint.
    <header className="sticky -top-9 z-40">
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
        <div className="mx-auto flex h-14 max-w-6xl items-stretch gap-3 px-4 sm:px-6 md:h-[72px]">
          {/* Renders only inside the dashboard, where this bar is also the
              sidebar's mobile header. */}
          <div className="flex items-center">
            <DashboardNavToggle />
          </div>

          {/* Same lockup as the sidebar: wordmark over the motto. */}
          <Link href="/" className="flex min-w-0 flex-col justify-center">
            <span className="font-serif text-[19px] font-semibold leading-tight tracking-[-0.02em] md:text-xl">
              ESA Platform
            </span>
            <span className="mt-0.5 truncate font-serif text-[13px] italic leading-tight text-muted-foreground">
              Non Scholae Sed Vitae Discimu
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
            {showMobileMenu && (
              <SiteMobileMenu showDashboardCta={showDashboardCta} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
