"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { courses, currentStudent, academicSchedules } from "@/lib/data";
import { statusTone, statusRule } from "@/lib/status";

const yearLabels: Record<number, string> = {
  100: "First Year",
  200: "Sophomore Year",
  300: "Junior Year",
  400: "Senior Year",
};

const semesters = [1, 2] as const;

const typeStyles = {
  semester: statusRule.info,
  midterm: statusRule.attention,
  finals: statusRule.critical,
  vacation: statusRule.positive,
};

const typeBadgeStyles = {
  semester: statusTone.info,
  midterm: statusTone.attention,
  finals: statusTone.critical,
  vacation: statusTone.positive,
};

export default function SchedulePage() {
  const [semester, setSemester] = useState<(typeof semesters)[number]>(1);

  const semesterCourses = courses
    .filter((c) => c.level === currentStudent.level && c.semester === semester)
    .sort((a, b) => a.code.localeCompare(b.code));

  const totalCredits = semesterCourses.reduce((sum, c) => sum + c.creditHours, 0);
  const yearLabel = yearLabels[currentStudent.level] ?? `Level ${currentStudent.level}`;

  return (
    <div className="space-y-5 sm:space-y-8">
      <PageHeader
        title="Schedule"
        description="Your semester course load and academic calendar."
      />

      <Tabs defaultValue="load">
        <TabsList>
          <TabsTrigger value="load">Course Load</TabsTrigger>
          <TabsTrigger value="academic">Academic Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="load" className="mt-4 space-y-4 sm:mt-6 sm:space-y-5">
          <div
            className="flex gap-1.5 sm:gap-2"
            role="tablist"
            aria-label="Select semester"
          >
            {semesters.map((s) => (
              <button
                key={s}
                onClick={() => setSemester(s)}
                role="tab"
                aria-selected={semester === s}
                className={`shrink-0 rounded-md px-3 py-2.5 text-[13px] font-medium transition-colors sm:px-4 sm:text-sm ${
                  semester === s
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground ring-1 ring-border hover:bg-secondary hover:text-foreground"
                }`}
              >
                Semester {s}
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            aria-label={`${yearLabel}, Semester ${semester} course load`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h2 className="text-lg font-semibold tracking-[-0.015em] sm:text-xl">
                  {yearLabel} · Level {currentStudent.level}
                </h2>
                <p className="text-[13px] text-muted-foreground sm:text-sm">
                  Semester {semester}
                </p>
              </div>
              <p
                className="text-[13px] text-muted-foreground sm:text-sm"
                aria-live="polite"
              >
                {semesterCourses.length} courses · {totalCredits} credit hours
              </p>
            </div>

            {semesterCourses.length > 0 ? (
              <div className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
                {semesterCourses.map((course) => (
                  <article
                    key={course.id}
                    className="flex gap-3 rounded-lg bg-card p-3 ring-1 ring-border sm:gap-5 sm:p-5"
                  >
                    <div className="flex w-14 shrink-0 flex-col items-center rounded-md bg-secondary py-2.5 sm:w-16 sm:py-3">
                      <span className="figure text-lg font-semibold sm:text-xl">
                        {course.creditHours}
                      </span>
                      <span className="label mt-0.5 text-muted-foreground">
                        {course.creditHours === 1 ? "credit" : "credits"}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold sm:text-base">
                          {course.name}
                        </h3>
                        <span className="figure shrink-0 text-[13px] font-semibold text-brand sm:text-sm">
                          {course.code}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted-foreground sm:mt-2.5 sm:text-sm">
                        <span>{course.department}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          Prerequisite:{" "}
                          <span className="font-medium text-foreground">
                            {course.prerequisite}
                          </span>
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-3 sm:mt-4">
                <EmptyState
                  icon={BookOpen}
                  title="No courses"
                  description={`No courses are listed for ${yearLabel}, Semester ${semester}.`}
                />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="academic" className="mt-4 space-y-2.5 sm:mt-6 sm:space-y-3">
          {academicSchedules.map((event) => (
            <article
              key={event.id}
              className={`rounded-lg border-l-4 bg-card p-3.5 ring-1 ring-border sm:p-5 ${typeStyles[event.type]}`}
            >
              <div className="flex items-start justify-between gap-2 sm:gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold sm:text-base">{event.title}</h3>
                  <p className="figure mt-1 text-[13px] text-muted-foreground">
                    {event.startDate} — {event.endDate}
                  </p>
                </div>
                <Badge className={`label shrink-0 ${typeBadgeStyles[event.type]}`}>
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
