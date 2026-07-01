import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  Megaphone,
  ArrowRight,
  HandCoins,
  GraduationCap,
  Users,
  Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  currentStudent,
  courses,
  classSchedules,
  announcements,
  academicSchedules,
  financialAidRecords,
  mentorshipMatches,
  outreachEvents,
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
    href: "/dashboard/financial-aid",
    label: "Financial Aid",
    description: "Track scholarships & grants",
    icon: HandCoins,
  },
  {
    href: "/dashboard/advising",
    label: "Advising",
    description: "Book advising sessions",
    icon: GraduationCap,
  },
  {
    href: "/dashboard/mentorship",
    label: "Mentorship",
    description: "Connect with mentors",
    icon: Users,
  },
  {
    href: "/dashboard/outreach",
    label: "Outreach",
    description: "Join community events",
    icon: Globe,
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
  const pendingAid = financialAidRecords.filter(
    (r) => r.status === "pending" || r.status === "under-review"
  );
  const activeMentor = mentorshipMatches.find((m) => m.status === "active");
  const upcomingOutreach = outreachEvents.filter(
    (e) => e.status === "upcoming"
  );

  return (
    <div className="space-y-8 sm:space-y-10">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Welcome back, {currentStudent.firstName}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:mt-2 sm:text-base">
          {currentStudent.program} · Level {currentStudent.level} ·{" "}
          {currentStudent.college}
        </p>
      </header>

      <nav aria-label="Quick links">
        <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" role="list">
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

      <div className="grid gap-8 lg:grid-cols-3">
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

        {pendingAid.length > 0 && (
          <section aria-labelledby="aid-heading">
            <div className="flex items-baseline justify-between">
              <h2 id="aid-heading" className="text-xl font-bold">
                Financial Aid
              </h2>
              <Link
                href="/dashboard/financial-aid"
                className="flex items-center gap-1 text-sm font-medium text-accent hover:underline"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {pendingAid.map((record) => (
                <div
                  key={record.id}
                  className="rounded-lg border bg-card p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold capitalize">
                        {record.type.replace("-", " ")}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {record.amount.toLocaleString()} {record.currency}
                      </p>
                    </div>
                    <Badge
                      className={
                        record.status === "pending"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                      }
                    >
                      {record.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeMentor && (
          <section aria-labelledby="mentor-heading">
            <h2 id="mentor-heading" className="text-xl font-bold">
              Your Mentor
            </h2>
            <div className="mt-4 rounded-lg border bg-card p-5">
              <p className="font-semibold">{activeMentor.mentorName}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {activeMentor.mentorTitle} · {activeMentor.mentorOrganization}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {activeMentor.mentorExpertise.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
              {activeMentor.nextMeeting && (
                <p className="mt-3 text-sm text-muted-foreground">
                  Next meeting: {activeMentor.nextMeeting}
                </p>
              )}
            </div>
          </section>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {nextEvent && (
          <section aria-labelledby="upcoming-heading">
            <h2 id="upcoming-heading" className="text-xl font-bold">
              Upcoming Academic Event
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

        {upcomingOutreach.length > 0 && (
          <section aria-labelledby="outreach-heading">
            <div className="flex items-baseline justify-between">
              <h2 id="outreach-heading" className="text-xl font-bold">
                Upcoming Outreach
              </h2>
              <Link
                href="/dashboard/outreach"
                className="flex items-center gap-1 text-sm font-medium text-accent hover:underline"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {upcomingOutreach.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className="rounded-lg border bg-card p-4"
                >
                  <p className="font-semibold">{event.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {event.date} · {event.time} · {event.location}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 rounded-full bg-secondary">
                      <div
                        className="h-1.5 rounded-full bg-accent"
                        style={{
                          width: `${Math.min(100, (event.enrolled / event.capacity) * 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {event.enrolled}/{event.capacity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
