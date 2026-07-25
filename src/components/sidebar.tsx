"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Megaphone,
  CreditCard,
  User,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard/schedule", label: "Schedule", icon: CalendarDays },
  { href: "/dashboard/announcements", label: "Announcements", icon: Megaphone },
  { href: "/dashboard/membership", label: "Membership", icon: CreditCard },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

const mobileNavItems = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/dashboard/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard/schedule", label: "Schedule", icon: CalendarDays },
  { href: "/dashboard/announcements", label: "News", icon: Megaphone },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <nav
        aria-label="Main navigation"
        className="fixed inset-y-0 left-0 z-50 hidden w-[256px] flex-col bg-sidebar text-sidebar-foreground md:flex"
      >
        <div className="flex items-center px-5 py-5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image
              src="/esa-logo.png"
              alt="ESA Logo"
              width={36}
              height={42}
              quality={90}
              className="h-[42px] w-9 object-contain"
            />
            <div>
              <p className="text-[15px] font-semibold leading-tight">
                ESA Platform
              </p>
              <p className="text-[13px] leading-tight text-sidebar-foreground/50">
                Economics Students
              </p>
            </div>
          </Link>
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

      {/* Mobile bottom tab bar */}
      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card md:hidden"
      >
        <ul className="flex items-stretch" role="list">
          {mobileNavItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex flex-col items-center gap-0.5 py-2 text-[11px] transition-colors",
                    isActive
                      ? "font-semibold text-accent"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" strokeWidth={isActive ? 2 : 1.5} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </>
  );
}
