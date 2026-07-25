import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const footerSections = [
  {
    heading: "Platform",
    links: [
      { label: "Courses", href: "/dashboard/courses" },
      { label: "Schedule", href: "/dashboard/schedule" },
      { label: "Announcements", href: "/dashboard/announcements" },
      { label: "Membership", href: "/dashboard/membership" },
    ],
  },
  {
    heading: "Association",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Profile", href: "/dashboard/profile" },
      { label: "About", href: "/about" },
      { label: "Features", href: "/#features" },
    ],
  },
];

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("border-t bg-card", className)}>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label="ESA Platform home"
            >
              <Image
                src="/esa-logo.png"
                alt=""
                width={40}
                height={47}
                quality={90}
                className="h-11 w-9 object-contain"
              />
              <div>
                <p className="font-serif text-base font-bold leading-tight tracking-tight">
                  Economics Students Association
                </p>
                <p className="text-[13px] text-muted-foreground">
                  Stella Maris Polytechnic University
                </p>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
              Your academic companion — courses, schedules, announcements, and
              association resources, all in one place.
            </p>
          </div>

          {footerSections.map((section) => (
            <nav key={section.heading} aria-label={section.heading}>
              <h3 className="text-[13px] font-semibold uppercase tracking-wide">
                {section.heading}
              </h3>
              <ul className="mt-3 space-y-2.5" role="list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-8 grid gap-4 border-t pt-6 text-[14px] text-muted-foreground sm:mt-10 sm:grid-cols-3 sm:pt-8">
          <div>
            <p className="font-medium text-foreground">University</p>
            <p className="mt-1">Stella Maris Polytechnic University</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Email</p>
            <a
              href="mailto:Econstudentsassn25@gmail.com"
              className="mt-1 inline-block break-all transition-colors hover:text-foreground"
            >
              Econstudentsassn25@gmail.com
            </a>
          </div>
          <div>
            <p className="font-medium text-foreground">Location</p>
            <p className="mt-1">Department of Economics, Main Campus</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t pt-6 text-[13px] text-muted-foreground sm:flex-row">
          <p>&copy; 2026 Economics Students Association. All rights reserved.</p>
          <nav aria-label="Legal" className="flex gap-5 sm:gap-6">
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
