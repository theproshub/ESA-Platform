import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  Megaphone,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  currentStudent,
  courses,
  classSchedules,
  announcements,
  academicSchedules,
} from "@/lib/data";

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
    description: "Check your class timetable",
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

const priorityStyles = {
  urgent: "bg-red-100 text-red-800",
  high: "bg-amber-100 text-amber-800",
  medium: "bg-blue-100 text-blue-800",
  low: "bg-stone-100 text-stone-700",
};

export default function DashboardPage() {
  const studentCourses = courses.filter(
    (c) => c.level === currentStudent.level && c.semester === 1
  );
  const todaySchedule = classSchedules.filter((s) => s.dayOfWeek === "Monday");
  const recentAnnouncements = announcements.slice(0, 3);
  const nextEvent = academicSchedules[1];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold">
          Welcome back, {currentStudent.firstName}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {currentStudent.program} · Level {currentStudent.level} ·{" "}
          {studentCourses.length} courses this semester
        </p>
      </header>

      <nav aria-label="Quick links">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {quickLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex items-start gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-secondary/60"
              >
                <link.icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="font-semibold">{link.label}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {link.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid gap-8 lg:grid-cols-5">
        <section className="lg:col-span-2" aria-labelledby="today-heading">
          <div className="flex items-baseline justify-between">
            <h2 id="today-heading" className="text-xl font-bold">
              Today&apos;s Classes
            </h2>
            <span className="text-sm text-muted-foreground">Monday</span>
          </div>
          <div className="mt-4 space-y-3">
            {todaySchedule.length > 0 ? (
              todaySchedule.map((cls) => (
                <div
                  key={cls.id}
                  className="flex gap-4 rounded-lg border bg-card p-4"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-base font-semibold">
                      {cls.startTime}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {cls.endTime}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{cls.courseName}</p>
                    <p className="text-sm text-muted-foreground">
                      {cls.courseCode} · {cls.venue}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-lg border bg-card p-6 text-center text-muted-foreground">
                No classes scheduled for today.
              </p>
            )}
          </div>
        </section>

        <section className="lg:col-span-3" aria-labelledby="announcements-heading">
          <div className="flex items-baseline justify-between">
            <h2 id="announcements-heading" className="text-xl font-bold">
              Recent Announcements
            </h2>
            <Link
              href="/dashboard/announcements"
              className="flex items-center gap-1 text-sm font-medium text-accent hover:underline"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {recentAnnouncements.map((ann) => (
              <article
                key={ann.id}
                className="rounded-lg border bg-card p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold leading-snug">{ann.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {ann.content}
                    </p>
                  </div>
                  <Badge className={`shrink-0 ${priorityStyles[ann.priority]}`}>
                    {ann.priority}
                  </Badge>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  {ann.author}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section aria-labelledby="semester-heading">
          <h2 id="semester-heading" className="text-xl font-bold">
            Semester at a Glance
          </h2>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {[
              { value: studentCourses.length, label: "Courses" },
              {
                value: studentCourses.reduce((s, c) => s + c.creditHours, 0),
                label: "Credit Hours",
              },
              { value: classSchedules.length, label: "Weekly Classes" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border bg-card p-5 text-center"
              >
                <p className="font-serif text-2xl font-bold">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {nextEvent && (
          <section aria-labelledby="upcoming-heading">
            <h2 id="upcoming-heading" className="text-xl font-bold">
              Upcoming
            </h2>
            <div className="mt-4 rounded-lg border bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{nextEvent.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {nextEvent.startDate} — {nextEvent.endDate}
                  </p>
                </div>
                <Badge variant="outline" className="capitalize">
                  {nextEvent.type}
                </Badge>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {nextEvent.description}
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
