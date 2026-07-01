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
  LogOut,
  HandCoins,
  GraduationCap,
  Users,
  Globe,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
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
      <div className={cn(
        "fixed inset-x-0 top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-card px-4 shadow-sm transition-transform duration-300 md:hidden",
        headerVisible ? "translate-y-0" : "-translate-y-full"
      )}>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
          className="flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-secondary"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-primary">
            <span className="text-[10px] font-bold text-primary-foreground">ESA</span>
          </div>
          <span className="text-sm font-semibold">ESA Platform</span>
        </Link>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
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
            <div className="flex h-9 w-9 items-center justify-center rounded bg-sidebar-primary">
              <span className="text-sm font-bold text-sidebar-primary-foreground">
                ESA
              </span>
            </div>
            <div>
              <p className="text-[15px] font-semibold leading-tight">
                ESA Platform
              </p>
              <p className="text-[13px] leading-tight text-sidebar-foreground/50">
                Stella Maris Poly
              </p>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
            className="rounded p-1 hover:bg-sidebar-accent md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-5 border-t border-sidebar-border" />

        <ul className="flex-1 space-y-1 overflow-y-auto px-3 py-4" role="list">
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
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-[15px] transition-colors",
                    isActive
                      ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/60 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                  )}
                >
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
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-[15px] text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
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
            className="flex items-center gap-3 rounded-md px-2 py-1 transition-colors hover:bg-sidebar-accent/60"
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-sm font-semibold text-sidebar-accent-foreground"
              aria-hidden="true"
            >
              JK
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-medium">Joseph Kollie</p>
              <p className="truncate text-[13px] text-sidebar-foreground/50">
                Level 200
              </p>
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
}
