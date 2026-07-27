"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Megaphone,
  Menu,
  X,
  HandCoins,
  GraduationCap,
  Users,
  Globe,
  Home,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Star } from "@/components/star-mark";
import { useState, useEffect, useRef } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard/schedule", label: "Schedule", icon: CalendarDays },
  { href: "/dashboard/announcements", label: "Announcements", icon: Megaphone },
  { href: "/dashboard/financial-aid", label: "Financial Aid", icon: HandCoins },
  { href: "/dashboard/advising", label: "Advising", icon: GraduationCap },
  { href: "/dashboard/mentorship", label: "Mentorship", icon: Users },
  { href: "/dashboard/outreach", label: "Outreach", icon: Globe },
];

function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "label flex items-center justify-center rounded-sm bg-sidebar-accent text-sidebar-accent-foreground",
        className
      )}
    >
      ESA
    </span>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setHeaderVisible(y < lastScrollY.current || y < 10);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-card px-4 transition-transform duration-300 md:hidden",
          headerVisible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
          className="flex h-9 w-9 items-center justify-center rounded-sm transition-colors hover:bg-secondary"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <Monogram className="h-7 w-8 !text-[9px] bg-brand text-brand-foreground" />
          <span className="font-serif text-[15px] font-semibold tracking-[-0.02em]">
            ESA Platform
          </span>
        </Link>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav
        aria-label="Main navigation"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[256px] flex-col bg-sidebar text-sidebar-foreground transition-transform duration-200 md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Monogram className="h-9 w-10" />
            <div>
              <p className="font-serif text-base font-semibold leading-tight tracking-[-0.02em]">
                ESA Platform
              </p>
              <p className="label mt-0.5 leading-tight text-sidebar-foreground/45">
                Stella Maris Poly
              </p>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
            className="rounded-sm p-1 hover:bg-sidebar-accent md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-5 border-t border-sidebar-border" />

        <ul className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4" role="list">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex items-center gap-3 rounded-sm py-2.5 pl-7 pr-3 text-[15px] transition-colors",
                    isActive
                      ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/55 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  {isActive && (
                    <Star className="absolute left-2 top-1/2 -translate-y-1/2 text-sidebar-primary" />
                  )}
                  <item.icon className="h-5 w-5 shrink-0" strokeWidth={1.75} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mx-5 border-t border-sidebar-border" />

        <div className="px-3 py-2">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 rounded-sm py-2.5 pl-7 pr-3 text-[15px] text-sidebar-foreground/55 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          >
            <Home className="h-5 w-5 shrink-0" strokeWidth={1.75} />
            Home
          </Link>
        </div>

        <div className="mx-5 border-t border-sidebar-border" />

        <div className="p-4">
          <Link
            href="/dashboard/profile"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 rounded-sm px-2 py-1.5 transition-colors hover:bg-sidebar-accent/50"
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-accent-foreground"
              aria-hidden="true"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-medium">Member</p>
              <p className="label leading-tight text-sidebar-foreground/45">
                View profile
              </p>
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
}
