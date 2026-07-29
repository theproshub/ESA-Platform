import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  Megaphone,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";
import { PriorityBadge } from "@/components/priority-badge";
import {
  currentStudent,
  courses,
  announcements,
  academicSchedules,
} from "@/lib/data";
import { formatDateRange } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your courses, schedule, announcements, and membership at a glance.",
};

const quickLinks = [
  {
    href: "/dashboard/courses",
    label: "Courses",
    description: "View the full course catalogue",
    icon: BookOpen,
  },
  {
    href: "/dashboard/schedule",
    label: "Schedule",
    description: "View your semester course load",
    icon: CalendarDays,
  },
  {
    href: "/dashboard/announcements",
    label: "Announcements",
    description: "Read the latest notices",
    icon: Megaphone,
  },
  {
    href: "/dashboard/membership",
    label: "Membership",
    description: "View your digital ID card",
    icon: CreditCard,
  },
];

export default function DashboardPage() {
  const studentCourses = courses.filter(
    (c) => c.level === currentStudent.level && c.semester === 1
  );
  const yearCourses = courses.filter((c) => c.level === currentStudent.level);
  const yearCredits = yearCourses.reduce((s, c) => s + c.creditHours, 0);
  const recentAnnouncements = announcements.slice(0, 3);
  // The first calendar event that hasn't finished yet. ISO dates compare
  // lexicographically, so no parsing is needed. The page is prerendered, so
  // "today" is the build date — fine while the calendar is static data.
  const today = new Date().toISOString().slice(0, 10);
  const nextEvent =
    academicSchedules.find((e) => (e.endDate ?? e.startDate) >= today) ??
    academicSchedules.at(-1);

  return (
    <div className="space-y-6 sm:space-y-10">
      <PageHeader
        title="Welcome back"
        description={`${currentStudent.program} · ${studentCourses.length} courses this semester`}
      />

      <nav aria-label="Quick links">
        <ul className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4" role="list">
          {quickLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex flex-col items-center gap-2 rounded-lg bg-card p-3.5 text-center ring-1 ring-border transition-colors hover:bg-secondary/60 sm:flex-row sm:items-start sm:gap-4 sm:p-4 sm:text-left"
              >
                <link.icon
                  className="h-5 w-5 shrink-0 text-brand"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold sm:text-base">{link.label}</p>
                  <p className="mt-0.5 hidden text-sm text-muted-foreground sm:block">
                    {link.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-5">
        <section className="lg:col-span-2" aria-labelledby="semester-load-heading">
          <div className="flex items-baseline justify-between">
            <h2 id="semester-load-heading" className="text-xl font-semibold tracking-[-0.015em] sm:text-2xl">
              This Semester
            </h2>
            <Link
              href="/dashboard/schedule"
              className="flex items-center gap-1 text-[13px] font-medium text-brand transition-colors hover:text-accent sm:text-sm"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
            {studentCourses.length > 0 ? (
              studentCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center gap-3 rounded-lg bg-card p-3 ring-1 ring-border sm:gap-4 sm:p-4"
                >
                  <div
                    className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-md bg-secondary"
                    aria-hidden="true"
                  >
                    <span className="figure text-base font-semibold leading-none">
                      {course.creditHours}
                    </span>
                    <span className="label mt-0.5 !text-[9px] text-muted-foreground">cr</span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold sm:text-base">
                      {course.name}
                    </p>
                    <p className="mt-0.5 text-[13px] text-muted-foreground sm:text-sm">
                      <span className="figure">{course.code}</span> ·{" "}
                      {course.department}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-lg bg-card p-5 text-center text-sm text-muted-foreground ring-1 ring-border sm:p-6">
                No courses listed for this semester.
              </p>
            )}
          </div>
        </section>

        <section className="lg:col-span-3" aria-labelledby="announcements-heading">
          <div className="flex items-baseline justify-between">
            <h2 id="announcements-heading" className="text-xl font-semibold tracking-[-0.015em] sm:text-2xl">
              Recent Announcements
            </h2>
            <Link
              href="/dashboard/announcements"
              className="flex items-center gap-1 text-[13px] font-medium text-brand transition-colors hover:text-accent sm:text-sm"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
            {recentAnnouncements.map((ann) => (
              <article
                key={ann.id}
                className="rounded-lg bg-card p-3 ring-1 ring-border sm:p-4"
              >
                <div className="flex items-start justify-between gap-2 sm:gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-snug sm:text-base">{ann.title}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground line-clamp-2 sm:text-sm">
                      {ann.content}
                    </p>
                  </div>
                  <PriorityBadge priority={ann.priority} className="shrink-0" />
                </div>
                <p className="label mt-3 text-muted-foreground">{ann.author}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
        <section aria-labelledby="semester-heading">
          <h2 id="semester-heading" className="text-xl font-semibold tracking-[-0.015em] sm:text-2xl">
            Semester at a Glance
          </h2>
          <div className="mt-3 grid grid-cols-3 gap-2.5 sm:mt-4 sm:gap-4">
            {[
              { value: studentCourses.length, label: "Courses" },
              {
                value: studentCourses.reduce((s, c) => s + c.creditHours, 0),
                label: "Credit Hours",
              },
              { value: yearCredits, label: "Year Credits" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg bg-card p-3.5 text-center ring-1 ring-border sm:p-5"
              >
                <p className="figure text-2xl font-semibold sm:text-[28px]">{stat.value}</p>
                <p className="label mt-2 text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {nextEvent && (
          <section aria-labelledby="upcoming-heading">
            <h2 id="upcoming-heading" className="text-xl font-semibold tracking-[-0.015em] sm:text-2xl">
              Upcoming
            </h2>
            <div className="mt-3 rounded-lg bg-card p-4 ring-1 ring-border sm:mt-4 sm:p-5">
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold sm:text-base">{nextEvent.title}</p>
                  <p className="figure mt-1 text-[13px] text-muted-foreground">
                    {formatDateRange(nextEvent.startDate, nextEvent.endDate)}
                  </p>
                </div>
                <Badge variant="outline" className="label shrink-0">
                  {nextEvent.type}
                </Badge>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm">
                {nextEvent.description}
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
