"use client";

import {
  GraduationCap,
  MapPin,
  Clock,
  CalendarDays,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { advisingSessions } from "@/lib/data";
import { statusTone } from "@/lib/status";
import { formatDate } from "@/lib/utils";

const typeLabels: Record<string, string> = {
  "course-planning": "Course Planning",
  registration: "Registration Help",
  "academic-support": "Academic Support",
  "career-guidance": "Career Guidance",
};

const statusConfig = {
  scheduled: {
    label: "Scheduled",
    className: statusTone.info,
    icon: CalendarDays,
  },
  completed: {
    label: "Completed",
    className: statusTone.positive,
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    className: statusTone.critical,
    icon: XCircle,
  },
};

export default function AdvisingPage() {
  const upcoming = advisingSessions.filter((s) => s.status === "scheduled");
  const past = advisingSessions.filter(
    (s) => s.status === "completed" || s.status === "cancelled"
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Academic Advising"
        description="Get help with course planning, registration, and navigating university procedures. ESA volunteers and faculty advisors are here to support you."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-card p-5 text-center ring-1 ring-border">
          <p className="figure text-[28px] font-semibold">{upcoming.length}</p>
          <p className="label mt-2 text-muted-foreground">Upcoming sessions</p>
        </div>
        <div className="rounded-lg bg-card p-5 text-center ring-1 ring-border">
          <p className="figure text-[28px] font-semibold">
            {past.filter((s) => s.status === "completed").length}
          </p>
          <p className="label mt-2 text-muted-foreground">Completed sessions</p>
        </div>
        <div className="rounded-lg bg-card p-5 text-center ring-1 ring-border">
          <p className="figure text-[28px] font-semibold">4</p>
          <p className="label mt-2 text-muted-foreground">Available advisors</p>
        </div>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming ({upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {upcoming.length > 0 ? (
            <div className="space-y-4">
              {upcoming.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          ) : (
            <NoSessions />
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          {past.length > 0 ? (
            <div className="space-y-4">
              {past.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          ) : (
            <NoSessions />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SessionCard({
  session,
}: {
  session: (typeof advisingSessions)[number];
}) {
  const status = statusConfig[session.status];
  const StatusIcon = status.icon;

  return (
    <article className="rounded-lg bg-card p-5 ring-1 ring-border">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={`label ${status.className}`}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {status.label}
            </Badge>
            <Badge variant="outline" className="label">
              {typeLabels[session.type]}
            </Badge>
          </div>
          <h3 className="mt-3 text-lg font-semibold tracking-[-0.015em]">
            {session.advisorName}
          </h3>
          <p className="text-sm text-muted-foreground">
            {session.advisorRole}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <CalendarDays
            className="h-4 w-4"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <span className="figure">{formatDate(session.date)}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Clock
            className="h-4 w-4"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <span className="figure">{session.time}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin
            className="h-4 w-4"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          {session.location}
        </span>
      </div>
      {session.notes && (
        <p className="mt-4 rounded-md bg-secondary/60 p-3 text-sm leading-relaxed text-muted-foreground">
          {session.notes}
        </p>
      )}
    </article>
  );
}

function NoSessions() {
  return (
    <EmptyState
      icon={GraduationCap}
      title="No sessions found"
      description="Visit the ESA office to schedule an advising session."
    />
  );
}
