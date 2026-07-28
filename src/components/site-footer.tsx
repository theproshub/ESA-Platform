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

const contactDetails = [
  { label: "University", value: "Stella Maris Polytechnic University" },
  {
    label: "Email",
    value: "Econstudentsassn25@gmail.com",
    href: "mailto:Econstudentsassn25@gmail.com",
  },
  { label: "Location", value: "Department of Economics, Main Campus" },
];

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("border-t bg-card", className)}>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt=""
                // Declared at display size, matching the header: Next builds
                // the srcset from these. Keeps the 550:640 aspect ratio.
                width={55}
                height={64}
                quality={90}
                className="h-11 w-auto shrink-0 object-contain"
              />
              <div>
                <p className="font-serif text-[17px] font-semibold leading-[1.1] tracking-[-0.02em]">
                  Economics Students Association
                </p>
                <p className="label mt-1 text-muted-foreground">
                  Stella Maris Polytechnic University
                </p>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
              Your academic companion — courses, schedules, announcements, and
              association resources, all in one place.
            </p>
          </div>

          {footerSections.map((section) => (
            <nav key={section.heading} aria-label={section.heading}>
              <h3 className="label text-muted-foreground">{section.heading}</h3>
              <ul className="mt-4 space-y-2.5" role="list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 grid gap-5 border-t pt-8 sm:grid-cols-3">
          {contactDetails.map((detail) => (
            <div key={detail.label}>
              <p className="label text-muted-foreground">{detail.label}</p>
              {detail.href ? (
                <a
                  href={detail.href}
                  className="mt-1.5 inline-block break-all text-[14px] transition-colors hover:text-accent"
                >
                  {detail.value}
                </a>
              ) : (
                <p className="mt-1.5 text-[14px]">{detail.value}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t pt-6 text-[13px] text-muted-foreground sm:flex-row">
          <p>&copy; 2026 Economics Students Association. All rights reserved.</p>
          <nav aria-label="Legal" className="flex gap-5 sm:gap-6">
            <Link href="/privacy" className="transition-colors hover:text-accent">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-accent">
              Terms
            </Link>
            <Link href="/contact" className="transition-colors hover:text-accent">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
