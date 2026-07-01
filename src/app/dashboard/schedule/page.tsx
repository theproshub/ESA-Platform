"use client";

import { useState } from "react";
import { CalendarDays, MapPin, User as UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Schedule</h1>
        <p className="mt-2 text-muted-foreground">
          Your class timetable and academic calendar.
        </p>
      </header>

      <Tabs defaultValue="timetable">
        <TabsList>
          <TabsTrigger value="timetable">Class Timetable</TabsTrigger>
          <TabsTrigger value="academic">Academic Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="timetable" className="mt-6 space-y-5">
          <div className="flex gap-2 overflow-x-auto" role="tablist" aria-label="Select day">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                role="tab"
                aria-selected={selectedDay === day}
                className={`shrink-0 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
                  selectedDay === day
                    ? "bg-primary text-primary-foreground"
                    : "border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <span className="hidden sm:inline">{day}</span>
                <span className="sm:hidden">{day.slice(0, 3)}</span>
              </button>
            ))}
          </div>

          <div role="tabpanel" aria-label={`${selectedDay} schedule`}>
            {daySchedule.length > 0 ? (
              <div className="space-y-3">
                {daySchedule.map((cls) => (
                  <article
                    key={cls.id}
                    className="flex gap-5 rounded-lg border bg-card p-5"
                  >
                    <div className="flex w-16 shrink-0 flex-col items-center rounded-md bg-secondary py-3">
                      <span className="text-base font-bold">{cls.startTime}</span>
                      <span className="mt-0.5 text-sm text-muted-foreground">
                        {cls.endTime}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{cls.courseName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {cls.courseCode}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                          {cls.venue}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <UserIcon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                          {cls.lecturer}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center rounded-lg border bg-card py-16 text-center">
                <CalendarDays
                  className="h-10 w-10 text-muted-foreground/40"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <p className="mt-4 text-lg font-medium">No classes</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  You have no classes on {selectedDay}.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="academic" className="mt-6 space-y-3">
          {academicSchedules.map((event) => (
            <article
              key={event.id}
              className={`rounded-lg border border-l-4 bg-card p-5 ${typeStyles[event.type]}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {event.startDate} — {event.endDate}
                  </p>
                </div>
                <Badge className={`capitalize ${typeBadgeStyles[event.type]}`}>
                  {event.type}
                </Badge>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {event.description}
              </p>
            </article>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
