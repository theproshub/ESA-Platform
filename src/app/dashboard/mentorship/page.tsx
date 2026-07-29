import type { Metadata } from "next";
import {
  Users,
  Building,
  CalendarDays,
  Briefcase,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { mentorshipMatches } from "@/lib/data";
import { statusTone } from "@/lib/status";

export const metadata: Metadata = {
  title: "Mentorship Programs",
};

const statusStyles = {
  active: statusTone.positive,
  upcoming: statusTone.info,
  completed: statusTone.quiet,
};

export default function MentorshipPage() {
  const active = mentorshipMatches.filter((m) => m.status === "active");
  const upcoming = mentorshipMatches.filter((m) => m.status === "upcoming");
  const completed = mentorshipMatches.filter((m) => m.status === "completed");

  return (
    <div className="space-y-8">
      <PageHeader
        title="Mentorship Programs"
        description="Connect with professionals, alumni, and industry leaders who guide your academic and career journey. ESA partners with organizations across Liberia to provide meaningful mentorship."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-card p-5 text-center ring-1 ring-border">
          <p className="figure text-[28px] font-semibold text-positive">
            {active.length}
          </p>
          <p className="label mt-2 text-muted-foreground">Active mentors</p>
        </div>
        <div className="rounded-lg bg-card p-5 text-center ring-1 ring-border">
          <p className="figure text-[28px] font-semibold">{upcoming.length}</p>
          <p className="label mt-2 text-muted-foreground">Upcoming programs</p>
        </div>
        <div className="rounded-lg bg-card p-5 text-center ring-1 ring-border">
          <p className="figure text-[28px] font-semibold">{completed.length}</p>
          <p className="label mt-2 text-muted-foreground">Completed programs</p>
        </div>
      </div>

      {active.length > 0 && (
        <section aria-labelledby="active-heading">
          <h2 id="active-heading" className="text-xl font-semibold tracking-[-0.015em]">
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
          <h2 id="upcoming-heading" className="text-xl font-semibold tracking-[-0.015em]">
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
          <h2 id="completed-heading" className="text-xl font-semibold tracking-[-0.015em]">
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
        <EmptyState
          icon={Users}
          title="No mentorship matches yet"
          description="Contact the ESA office to join a mentorship program."
        />
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
    <article className="rounded-lg bg-card p-5 ring-1 ring-border">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div
            className="figure flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-base font-semibold text-brand-foreground"
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
        <Badge className={`label ${statusStyles[match.status]}`}>
          {match.status}
        </Badge>
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
          <Badge key={skill} variant="outline" className="label">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm">
        <span className="text-muted-foreground">
          Duration:{" "}
          <span className="figure">
            {match.startDate} — {match.endDate}
          </span>
        </span>
        {match.nextMeeting && (
          <span className="font-medium text-foreground">
            Next meeting: <span className="figure">{match.nextMeeting}</span>
          </span>
        )}
      </div>
    </article>
  );
}
