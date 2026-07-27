"use client";

import { createContext, useContext, useState } from "react";
import { Menu } from "lucide-react";

type DashboardNavState = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DashboardNavContext = createContext<DashboardNavState | null>(null);

/**
 * Shares the dashboard drawer's open state between the sidebar, which renders
 * the drawer, and the site header, which renders the button that opens it.
 */
export function DashboardNavProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <DashboardNavContext.Provider value={{ open, setOpen }}>
      {children}
    </DashboardNavContext.Provider>
  );
}

/** Null outside the dashboard, where there is no drawer to toggle. */
export function useDashboardNav() {
  return useContext(DashboardNavContext);
}

/**
 * Rendered in the site header's leading slot. Returns nothing on public pages,
 * so the header stays a single component across the whole site.
 */
export function DashboardNavToggle() {
  const nav = useDashboardNav();
  if (!nav) return null;

  return (
    <button
      type="button"
      onClick={() => nav.setOpen(true)}
      aria-label="Open navigation menu"
      aria-expanded={nav.open}
      className="-ml-2 flex h-10 w-10 items-center justify-center rounded-sm text-foreground transition-colors hover:bg-secondary md:hidden"
    >
      <Menu className="h-5 w-5" strokeWidth={1.75} />
    </button>
  );
}
