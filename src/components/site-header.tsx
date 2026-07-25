import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Student Portal", href: "/dashboard" },
];

export function SiteHeader() {
  return (
    <header>
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 text-[12px] sm:px-6 sm:text-[13px]">
          <span className="hidden text-primary-foreground/60 sm:inline">
            Stella Maris Polytechnic University
          </span>
          <nav
            aria-label="Utility links"
            className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-1 text-primary-foreground/60 sm:w-auto sm:flex-nowrap sm:justify-end sm:gap-5"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary-foreground"
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
              className="h-10 w-9 object-contain sm:h-14 sm:w-12"
            />
            <div>
              <p className="font-serif text-[15px] font-bold leading-tight tracking-tight sm:text-lg md:text-xl">
                Economics Students Association
              </p>
              <p className="hidden text-[13px] leading-tight text-muted-foreground sm:block">
                Non Scholae Sed Vitae Discimu
              </p>
            </div>
          </Link>
          <Link href="/dashboard" className="hidden sm:inline-flex">
            <Button className="gap-2">
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
