import {
  Users,
  Building,
  CalendarDays,
  Briefcase,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { mentorshipMatches } from "@/lib/data";

const statusStyles = {
  active: "bg-emerald-100 text-emerald-800",
  upcoming: "bg-blue-100 text-blue-800",
  completed: "bg-stone-100 text-stone-700",
};

export default function MentorshipPage() {
  const active = mentorshipMatches.filter((m) => m.status === "active");
  const upcoming = mentorshipMatches.filter((m) => m.status === "upcoming");
  const completed = mentorshipMatches.filter((m) => m.status === "completed");

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Mentorship Programs</h1>
        <p className="mt-2 text-muted-foreground">
          Connect with professionals, alumni, and industry leaders who guide
          your academic and career journey. ESA partners with organizations
          across Liberia to provide meaningful mentorship.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-5 text-center">
          <p className="font-serif text-2xl font-bold text-emerald-700">
            {active.length}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Active Mentors</p>
        </div>
        <div className="rounded-lg border bg-card p-5 text-center">
          <p className="font-serif text-2xl font-bold">{upcoming.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Upcoming Programs
          </p>
        </div>
        <div className="rounded-lg border bg-card p-5 text-center">
          <p className="font-serif text-2xl font-bold">{completed.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Completed Programs
          </p>
        </div>
      </div>

      {active.length > 0 && (
        <section aria-labelledby="active-heading">
          <h2 id="active-heading" className="text-xl font-bold">
            Active Mentorship
          </h2>
          <div className="mt-4 space-y-4">
            {active.map((match) => (
              <MentorCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {upcoming.length > 0 && (
        <section aria-labelledby="upcoming-heading">
          <h2 id="upcoming-heading" className="text-xl font-bold">
            Upcoming Programs
          </h2>
          <div className="mt-4 space-y-4">
            {upcoming.map((match) => (
              <MentorCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {completed.length > 0 && (
        <section aria-labelledby="completed-heading">
          <h2 id="completed-heading" className="text-xl font-bold">
            Completed Programs
          </h2>
          <div className="mt-4 space-y-4">
            {completed.map((match) => (
              <MentorCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {mentorshipMatches.length === 0 && (
        <div className="flex flex-col items-center rounded-lg border bg-card py-16 text-center">
          <Users
            className="h-10 w-10 text-muted-foreground/40"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="mt-4 text-lg font-medium">No mentorship matches yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Contact the ESA office to join a mentorship program.
          </p>
        </div>
      )}
    </div>
  );
}

function MentorCard({
  match,
}: {
  match: (typeof mentorshipMatches)[number];
}) {
  return (
    <article className="rounded-lg border bg-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground"
            aria-hidden="true"
          >
            {match.mentorName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <h3 className="font-semibold">{match.mentorName}</h3>
            <p className="text-sm text-muted-foreground">
              {match.mentorTitle}
            </p>
          </div>
        </div>
        <Badge className={statusStyles[match.status]}>{match.status}</Badge>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Building
            className="h-4 w-4"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          {match.mentorOrganization}
        </span>
        <span className="flex items-center gap-1.5">
          <CalendarDays
            className="h-4 w-4"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          {match.meetingFrequency}
        </span>
        <span className="flex items-center gap-1.5">
          <Briefcase
            className="h-4 w-4"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          {match.programName}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {match.mentorExpertise.map((skill) => (
          <Badge key={skill} variant="outline" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
        <span className="text-muted-foreground">
          Duration: {match.startDate} — {match.endDate}
        </span>
        {match.nextMeeting && (
          <span className="font-medium text-accent">
            Next meeting: {match.nextMeeting}
          </span>
        )}
      </div>
    </article>
  );
}
