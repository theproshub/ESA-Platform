import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";

export function SiteHeader({
  /** Suppressed inside the dashboard, where "Open Dashboard" points at the
      page you are already on. */
  showDashboardCta = true,
}: {
  showDashboardCta?: boolean;
}) {
  return (
    // Sticks by the height of the eyebrow strip below, so that strip scrolls
    // out of view and the navigation bar pins to the top. Static on mobile,
    // where a two-row header would eat too much of the viewport.
    <header className="md:sticky md:-top-9 md:z-40">
      {/* Parent institution. Fixed height — the negative sticky offset above
          depends on it. */}
      <div className="bg-brand text-brand-foreground">
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-center px-4 sm:justify-start sm:px-6">
          <span className="label text-brand-foreground/40">
            Stella Maris Polytechnic University
          </span>
        </div>
      </div>

      {/* 90% rather than a heavier frost: when the pinned bar sits over the
          navy hero, the tint showing through drops the muted nav links to
          3.99:1 at 80%. At 90% they measure 4.93:1 and still read as glass. */}
      <div className="border-b border-border bg-card/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col px-4 sm:px-6 md:h-[72px] md:flex-row md:items-stretch">
          <Link href="/" className="flex min-w-0 items-center py-3.5 md:py-0">
            <span className="min-w-0">
              <span className="block truncate font-serif text-[17px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-xl md:text-[22px]">
                Arthur Barclay Business College
              </span>
              <span className="mt-0.5 hidden font-serif text-[15px] italic leading-tight text-muted-foreground sm:block">
                Non Scholae Sed Vitae Discimu
              </span>
            </span>
          </Link>

          <div className="flex items-stretch justify-center gap-6 border-t border-border md:ml-auto md:gap-10 md:border-t-0">
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
          </div>
        </div>
      </div>
    </header>
  );
}
