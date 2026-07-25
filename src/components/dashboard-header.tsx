"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, LogOut, User } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/courses": "Courses",
  "/dashboard/schedule": "Schedule",
  "/dashboard/announcements": "Announcements",
  "/dashboard/membership": "Membership",
  "/dashboard/profile": "Profile",
};

export function DashboardHeader() {
  const pathname = usePathname();
  const title =
    pageTitles[pathname] ??
    Object.entries(pageTitles).find(
      ([href]) => href !== "/dashboard" && pathname.startsWith(href)
    )?.[1] ??
    "Dashboard";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:px-6 md:px-8">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 md:hidden"
          aria-label="ESA Platform home"
        >
          <Image
            src="/esa-logo.png"
            alt=""
            width={28}
            height={33}
            quality={90}
            className="h-8 w-7 object-contain"
          />
          <span className="font-serif text-[15px] font-bold tracking-tight">
            ESA
          </span>
        </Link>

        <h2 className="hidden text-lg font-semibold md:block">{title}</h2>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
              aria-hidden="true"
            >
              <User className="h-4 w-4" strokeWidth={1.75} />
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-[13px] font-medium leading-tight">Member</p>
            </div>
          </div>
          <Link
            href="/"
            aria-label="Go to homepage"
            title="Homepage"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Home className="h-4 w-4" strokeWidth={1.75} />
          </Link>
          <button
            aria-label="Sign out"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <LogOut className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </header>
  );
}
