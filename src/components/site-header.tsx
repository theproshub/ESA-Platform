import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Star } from "@/components/star-mark";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Student Portal", href: "/dashboard" },
];

export function SiteHeader() {
  return (
    <header>
      <div className="bg-brand text-brand-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
          <span className="label hidden items-center gap-2 text-brand-foreground/50 sm:flex">
            <Star className="h-2 w-2 text-accent" />
            Stella Maris Polytechnic University
          </span>
          <nav
            aria-label="Utility links"
            className="label flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-1 text-brand-foreground/50 sm:w-auto sm:flex-nowrap sm:justify-end sm:gap-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-brand-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link
            href="/"
            className="flex items-center gap-3 sm:gap-4"
            aria-label="ESA Platform home"
          >
            <Image
              src="/esa-logo.png"
              alt="Economics Students Association crest"
              width={48}
              height={56}
              quality={90}
              // Above the fold on every page that renders the header, so it
              // must not lazy-load. Eager rather than `preload`, per Next's
              // guidance to reserve `preload` for the actual LCP element — this
              // is a 48px mark, and on the homepage the hero crest is the one
              // that earns an explicit preload.
              loading="eager"
              className="h-10 w-9 object-contain sm:h-14 sm:w-12"
            />
            <div>
              <p className="font-serif text-[17px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-xl md:text-[22px]">
                Economics Students Association
              </p>
              <p className="label mt-1 hidden text-muted-foreground sm:block">
                Non Scholae Sed Vitae Discimu
              </p>
            </div>
          </Link>
          <Link href="/dashboard" className="hidden sm:inline-flex">
            <Button size="lg" className="gap-2">
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
