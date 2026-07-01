"use client";

import { useState } from "react";
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
import { advisingSessions } from "@/lib/data";

const typeLabels: Record<string, string> = {
  "course-planning": "Course Planning",
  registration: "Registration Help",
  "academic-support": "Academic Support",
  "career-guidance": "Career Guidance",
};

const typeStyles: Record<string, string> = {
  "course-planning": "bg-blue-100 text-blue-800",
  registration: "bg-violet-100 text-violet-800",
  "academic-support": "bg-amber-100 text-amber-800",
  "career-guidance": "bg-emerald-100 text-emerald-800",
};

const statusConfig = {
  scheduled: { label: "Scheduled", className: "bg-blue-100 text-blue-800", icon: CalendarDays },
  completed: { label: "Completed", className: "bg-emerald-100 text-emerald-800", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-800", icon: XCircle },
};

export default function AdvisingPage() {
  const upcoming = advisingSessions.filter((s) => s.status === "scheduled");
  const past = advisingSessions.filter(
    (s) => s.status === "completed" || s.status === "cancelled"
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Academic Advising</h1>
        <p className="mt-2 text-muted-foreground">
          Get help with course planning, registration, and navigating university
          procedures. ESA volunteers and faculty advisors are here to support
          you.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-5 text-center">
          <p className="font-serif text-2xl font-bold">{upcoming.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Upcoming Sessions
          </p>
        </div>
        <div className="rounded-lg border bg-card p-5 text-center">
          <p className="font-serif text-2xl font-bold">
            {past.filter((s) => s.status === "completed").length}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Completed Sessions
          </p>
        </div>
        <div className="rounded-lg border bg-card p-5 text-center">
          <p className="font-serif text-2xl font-bold">4</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Available Advisors
          </p>
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
            <EmptyState />
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
            <EmptyState />
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
    <article className="rounded-lg border bg-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={status.className}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {status.label}
            </Badge>
            <Badge className={typeStyles[session.type]}>
              {typeLabels[session.type]}
            </Badge>
          </div>
          <h3 className="mt-3 font-semibold">{session.advisorName}</h3>
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
          {session.date}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock
            className="h-4 w-4"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          {session.time}
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

function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-lg border bg-card py-16 text-center">
      <GraduationCap
        className="h-10 w-10 text-muted-foreground/40"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <p className="mt-4 text-lg font-medium">No sessions found</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Visit the ESA office to schedule an advising session.
      </p>
    </div>
  );
}
