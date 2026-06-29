"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Megaphone,
  CreditCard,
  User,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard/schedule", label: "Schedule", icon: CalendarDays },
  { href: "/dashboard/announcements", label: "Announcements", icon: Megaphone },
  { href: "/dashboard/membership", label: "Membership", icon: CreditCard },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation menu"
        className="fixed top-4 left-4 z-50 flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card shadow-sm transition-colors hover:bg-secondary md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

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
                Economics Students
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

        <ul className="flex-1 space-y-1 px-3 py-4" role="list">
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

        <div className="p-4">
          <div className="flex items-center gap-3 px-2">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-sm font-semibold text-sidebar-accent-foreground"
              aria-hidden="true"
            >
              KM
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-medium">Kwame Mensah</p>
              <p className="truncate text-[13px] text-sidebar-foreground/50">
                Level 200
              </p>
            </div>
            <button
              aria-label="Sign out"
              className="rounded p-1.5 text-sidebar-foreground/40 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
