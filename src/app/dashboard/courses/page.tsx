"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { courses } from "@/lib/data";

const levels = [100, 200, 300, 400] as const;
const semesters = [1, 2] as const;

export default function CoursesPage() {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedSemester, setSelectedSemester] = useState<string>("all");

  const filteredCourses = courses.filter((course) => {
    const levelMatch =
      selectedLevel === "all" || course.level === Number(selectedLevel);
    const semesterMatch =
      selectedSemester === "all" ||
      course.semester === Number(selectedSemester);
    return levelMatch && semesterMatch;
  });

  const totalCredits = filteredCourses.reduce(
    (sum, c) => sum + c.creditHours,
    0
  );

  return (
    <div className="space-y-5 sm:space-y-8">
      <PageHeader
        title="Course Guide"
        description="Browse the full course catalogue by level and semester."
      />

      <div
        className="space-y-3 sm:space-y-0 sm:flex sm:flex-row sm:items-center sm:gap-4"
        role="search"
        aria-label="Filter courses"
      >
        <div className="flex gap-2 sm:gap-4">
          <Select
            value={selectedLevel}
            onValueChange={(v) => setSelectedLevel(v ?? "all")}
          >
            <SelectTrigger className="flex-1 sm:w-44 sm:flex-none" aria-label="Select level">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {levels.map((level) => (
                <SelectItem key={level} value={String(level)}>
                  Level {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedSemester}
            onValueChange={(v) => setSelectedSemester(v ?? "all")}
          >
            <SelectTrigger className="flex-1 sm:w-48 sm:flex-none" aria-label="Select semester">
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Semesters</SelectItem>
              {semesters.map((sem) => (
                <SelectItem key={sem} value={String(sem)}>
                  Semester {sem}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-[13px] text-muted-foreground sm:ml-auto sm:text-sm" aria-live="polite">
          {filteredCourses.length} courses · {totalCredits} credit hours
        </p>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <article
              key={course.id}
              className="rounded-lg bg-card p-4 ring-1 ring-border transition-colors hover:bg-secondary/40 sm:p-5"
            >
              <div className="flex items-center justify-between">
                <span className="figure text-[13px] font-semibold text-brand sm:text-sm">
                  {course.code}
                </span>
                <Badge variant="outline" className="label">
                  {course.creditHours} CR
                </Badge>
              </div>
              <h3 className="mt-2 text-base font-semibold leading-snug tracking-[-0.015em] sm:text-lg">
                {course.name}
              </h3>
              <dl className="mt-3 space-y-1 text-[13px] sm:mt-4 sm:space-y-1.5 sm:text-sm">
                {[
                  ["Level", String(course.level)],
                  ["Semester", String(course.semester)],
                  ["Prerequisite", course.prerequisite],
                  ["Department", course.department],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-2">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="truncate font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={BookOpen}
          title="No courses found"
          description="Try adjusting your filters."
        />
      )}
    </div>
  );
}
