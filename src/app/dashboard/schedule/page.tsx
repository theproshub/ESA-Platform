"use client";

import { useState } from "react";
import { CalendarDays, MapPin, User as UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { classSchedules, academicSchedules } from "@/lib/data";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const typeStyles = {
  semester: "border-l-blue-600",
  midterm: "border-l-amber-500",
  finals: "border-l-red-600",
  vacation: "border-l-emerald-600",
};

const typeBadgeStyles = {
  semester: "bg-blue-100 text-blue-800",
  midterm: "bg-amber-100 text-amber-800",
  finals: "bg-red-100 text-red-800",
  vacation: "bg-emerald-100 text-emerald-800",
};

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Monday");

  const daySchedule = classSchedules
    .filter((s) => s.dayOfWeek === selectedDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="space-y-5 sm:space-y-8">
      <PageHeader
        title="Schedule"
        description="Your class timetable and academic calendar."
      />

      <Tabs defaultValue="timetable">
        <TabsList>
          <TabsTrigger value="timetable">Class Timetable</TabsTrigger>
          <TabsTrigger value="academic">Academic Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="timetable" className="mt-4 space-y-4 sm:mt-6 sm:space-y-5">
          <div className="flex gap-1.5 overflow-x-auto sm:gap-2" role="tablist" aria-label="Select day">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                role="tab"
                aria-selected={selectedDay === day}
                className={`shrink-0 rounded-md px-3 py-2.5 text-[13px] font-medium transition-colors sm:px-4 sm:text-sm ${
                  selectedDay === day
                    ? "bg-primary text-primary-foreground"
                    : "border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <span className="sm:hidden">{day.slice(0, 3)}</span>
                <span className="hidden sm:inline">{day}</span>
              </button>
            ))}
          </div>

          <div role="tabpanel" aria-label={`${selectedDay} schedule`}>
            {daySchedule.length > 0 ? (
              <div className="space-y-2.5 sm:space-y-3">
                {daySchedule.map((cls) => (
                  <article
                    key={cls.id}
                    className="flex gap-3 rounded-lg border bg-card p-3 sm:gap-5 sm:p-5"
                  >
                    <div className="flex w-14 shrink-0 flex-col items-center rounded-md bg-secondary py-2.5 sm:w-16 sm:py-3">
                      <span className="text-sm font-bold sm:text-base">{cls.startTime}</span>
                      <span className="mt-0.5 text-[12px] text-muted-foreground sm:text-sm">
                        {cls.endTime}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold sm:text-base">{cls.courseName}</h3>
                      <p className="text-[13px] text-muted-foreground sm:text-sm">
                        {cls.courseCode}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-3 text-[13px] text-muted-foreground sm:mt-3 sm:gap-4 sm:text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.75} aria-hidden="true" />
                          {cls.venue}
                        </span>
                        <span className="flex items-center gap-1">
                          <UserIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.75} aria-hidden="true" />
                          {cls.lecturer}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={CalendarDays}
                title="No classes"
                description={`You have no classes on ${selectedDay}.`}
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="academic" className="mt-4 space-y-2.5 sm:mt-6 sm:space-y-3">
          {academicSchedules.map((event) => (
            <article
              key={event.id}
              className={`rounded-lg border border-l-4 bg-card p-3.5 sm:p-5 ${typeStyles[event.type]}`}
            >
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold sm:text-base">{event.title}</h3>
                  <p className="mt-0.5 text-[13px] text-muted-foreground sm:mt-1 sm:text-sm">
                    {event.startDate} — {event.endDate}
                  </p>
                </div>
                <Badge className={`shrink-0 text-[11px] capitalize sm:text-xs ${typeBadgeStyles[event.type]}`}>
                  {event.type}
                </Badge>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm">
                {event.description}
              </p>
            </article>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
