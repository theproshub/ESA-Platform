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
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { outreachEvents } from "@/lib/data";
import { statusTone } from "@/lib/status";

const typeLabels: Record<string, string> = {
  workshop: "Workshop",
  seminar: "Seminar",
  "community-service": "Community Service",
  research: "Research",
  networking: "Networking",
};

const statusStyles: Record<string, string> = {
  upcoming: statusTone.info,
  ongoing: statusTone.positive,
  completed: statusTone.quiet,
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
      <PageHeader
        title="Community Outreach"
        description="Workshops, seminars, research activities, community service, and networking events organized by ESA to equip members with knowledge and contribute to Liberia's development."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-card p-5 text-center ring-1 ring-border">
          <p className="figure text-[28px] font-semibold">{upcoming.length}</p>
          <p className="label mt-2 text-muted-foreground">Upcoming events</p>
        </div>
        <div className="rounded-lg bg-card p-5 text-center ring-1 ring-border">
          <p className="figure text-[28px] font-semibold">{completed.length}</p>
          <p className="label mt-2 text-muted-foreground">Completed events</p>
        </div>
        <div className="rounded-lg bg-card p-5 text-center ring-1 ring-border">
          <p className="figure text-[28px] font-semibold">{totalParticipants}</p>
          <p className="label mt-2 text-muted-foreground">Total participants</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
        <button
          onClick={() => setFilterType("all")}
          aria-pressed={filterType === "all"}
          className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            filterType === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground ring-1 ring-border hover:bg-secondary"
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
                : "bg-card text-muted-foreground ring-1 ring-border hover:bg-secondary"
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
                className="rounded-lg bg-card p-5 ring-1 ring-border"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={`label ${statusStyles[event.status]}`}>
                        {event.status}
                      </Badge>
                      <Badge variant="outline" className="label">
                        {typeLabels[event.type]}
                      </Badge>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold leading-snug tracking-[-0.015em]">
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
                    <span className="figure">{event.date}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock
                      className="h-4 w-4"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <span className="figure">{event.time}</span>
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
                    <span className="figure">
                      {event.enrolled}/{event.capacity}
                    </span>{" "}
                    enrolled
                  </div>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full bg-brand transition-all"
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
          <EmptyState
            icon={Globe}
            title="No events found"
            description="Try adjusting your filter."
          />
        )}
      </div>
    </div>
  );
}
