import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/site-nav";

export function SiteHeader() {
  return (
    <header>
      <div className="bg-brand text-brand-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
          <span className="label hidden text-brand-foreground/40 sm:block">
            Stella Maris Polytechnic University
          </span>
          <SiteNav />
        </div>
      </div>
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-3.5">
          <Link
            href="/"
            className="flex items-center gap-3 sm:gap-3.5"
            aria-label="ESA Platform home"
          >
            <Image
              src="/esa-logo.png"
              alt="Economics Students Association crest"
              width={48}
              height={56}
              quality={90}
              // Above the fold on every page that renders the site header, so it
              // must not lazy-load. Eager rather than `preload`, per Next's
              // guidance to reserve `preload` for the actual LCP element — this
              // is a 48px mark, and on the homepage the hero crest is the one
              // that earns an explicit preload.
              loading="eager"
              className="h-10 w-9 object-contain sm:h-[52px] sm:w-11"
            />
            <div>
              <p className="font-serif text-[17px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-xl md:text-[22px]">
                Economics Students Association
              </p>
              {/* Set in the serif italic rather than mono: it reads as a
                  subordinate caption to the wordmark instead of competing with
                  it, and keeps mono reserved for figures and labels. */}
              <p className="mt-0.5 hidden font-serif text-[15px] italic leading-tight text-muted-foreground sm:block">
                Non Scholae Sed Vitae Discimu
              </p>
            </div>
          </Link>
          <Link href="/dashboard" className="hidden shrink-0 sm:inline-flex">
            <Button className="h-9 gap-2 px-4">
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
