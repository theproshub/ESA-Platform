"use client";

import { useState } from "react";
import {
  Globe,
  MapPin,
  CalendarDays,
  Clock,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { outreachEvents } from "@/lib/data";

const typeLabels: Record<string, string> = {
  workshop: "Workshop",
  seminar: "Seminar",
  "community-service": "Community Service",
  research: "Research",
  networking: "Networking",
};

const typeStyles: Record<string, string> = {
  workshop: "bg-violet-100 text-violet-800",
  seminar: "bg-blue-100 text-blue-800",
  "community-service": "bg-emerald-100 text-emerald-800",
  research: "bg-amber-100 text-amber-800",
  networking: "bg-rose-100 text-rose-800",
};

const statusStyles: Record<string, string> = {
  upcoming: "bg-blue-100 text-blue-800",
  ongoing: "bg-emerald-100 text-emerald-800",
  completed: "bg-stone-100 text-stone-700",
};

export default function OutreachPage() {
  const [filterType, setFilterType] = useState<string>("all");

  const types = [...new Set(outreachEvents.map((e) => e.type))];

  const filtered =
    filterType === "all"
      ? outreachEvents
      : outreachEvents.filter((e) => e.type === filterType);

  const upcoming = outreachEvents.filter((e) => e.status === "upcoming");
  const completed = outreachEvents.filter((e) => e.status === "completed");
  const totalParticipants = outreachEvents.reduce(
    (sum, e) => sum + e.enrolled,
    0
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Community Outreach</h1>
        <p className="mt-2 text-muted-foreground">
          Workshops, seminars, research activities, community service, and
          networking events organized by ESA to equip members with knowledge and
          contribute to Liberia&apos;s development.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-5 text-center">
          <p className="font-serif text-2xl font-bold">{upcoming.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">Upcoming Events</p>
        </div>
        <div className="rounded-lg border bg-card p-5 text-center">
          <p className="font-serif text-2xl font-bold">{completed.length}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Completed Events
          </p>
        </div>
        <div className="rounded-lg border bg-card p-5 text-center">
          <p className="font-serif text-2xl font-bold">{totalParticipants}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Total Participants
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
        <button
          onClick={() => setFilterType("all")}
          aria-pressed={filterType === "all"}
          className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            filterType === "all"
              ? "bg-primary text-primary-foreground"
              : "border bg-card text-muted-foreground hover:bg-secondary"
          }`}
        >
          All
        </button>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            aria-pressed={filterType === type}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              filterType === type
                ? "bg-primary text-primary-foreground"
                : "border bg-card text-muted-foreground hover:bg-secondary"
            }`}
          >
            {typeLabels[type]}
          </button>
        ))}
      </div>

      <div aria-live="polite">
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((event) => (
              <article
                key={event.id}
                className="rounded-lg border bg-card p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={statusStyles[event.status]}>
                        {event.status}
                      </Badge>
                      <Badge className={typeStyles[event.type]}>
                        {typeLabels[event.type]}
                      </Badge>
                    </div>
                    <h3 className="mt-3 font-serif text-xl font-semibold leading-snug">
                      {event.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {event.description}
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
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock
                      className="h-4 w-4"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    {event.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin
                      className="h-4 w-4"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    {event.location}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users
                      className="h-4 w-4"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    {event.enrolled}/{event.capacity} enrolled
                  </div>
                  <div className="h-2 flex-1 rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full bg-accent transition-all"
                      style={{
                        width: `${Math.min(100, (event.enrolled / event.capacity) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <footer className="mt-3 text-sm text-muted-foreground">
                  Organized by {event.organizer}
                </footer>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-lg border bg-card py-16 text-center">
            <Globe
              className="h-10 w-10 text-muted-foreground/40"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="mt-4 text-lg font-medium">No events found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
