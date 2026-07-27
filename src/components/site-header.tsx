import Link from "next/link";
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
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 sm:py-4">
          {/* Names the college, not the association: the ESA crest and wordmark
              carry the hero, and repeating them here read as duplication. */}
          <Link href="/" className="min-w-0">
            <p className="truncate font-serif text-[17px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-xl md:text-[22px]">
              Arthur Barclay Business College
            </p>
            <p className="mt-0.5 hidden font-serif text-[15px] italic leading-tight text-muted-foreground sm:block">
              Non Scholae Sed Vitae Discimu
            </p>
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
