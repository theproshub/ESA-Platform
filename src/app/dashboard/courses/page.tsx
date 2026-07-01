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
import { courses } from "@/lib/data";

const levels = [100, 200, 300, 400] as const;
const semesters = [1, 2] as const;

const levelColors: Record<number, string> = {
  100: "border-l-blue-500",
  200: "border-l-emerald-500",
  300: "border-l-amber-500",
  400: "border-l-purple-500",
};

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
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Course Guide</h1>
        <p className="mt-2 text-muted-foreground">
          Browse the full course catalogue by level and semester.
        </p>
      </header>

      <div
        className="flex flex-col gap-4 sm:flex-row sm:items-center"
        role="search"
        aria-label="Filter courses"
      >
        <label className="text-sm font-medium text-muted-foreground">
          Filter by:
        </label>
        <Select
          value={selectedLevel}
          onValueChange={(v) => setSelectedLevel(v ?? "all")}
        >
          <SelectTrigger className="w-full sm:w-44" aria-label="Select level">
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
          <SelectTrigger className="w-full sm:w-48" aria-label="Select semester">
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
        <p className="ml-auto text-sm text-muted-foreground" aria-live="polite">
          {filteredCourses.length} courses · {totalCredits} credit hours
        </p>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <article
              key={course.id}
              className={`rounded-lg border border-l-4 ${levelColors[course.level] ?? ""} bg-card p-5 transition-colors hover:bg-secondary/40`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-accent">
                  {course.code}
                </span>
                <Badge variant="outline">{course.creditHours} CR</Badge>
              </div>
              <h3 className="mt-2 font-serif text-lg font-semibold leading-snug">
                {course.name}
              </h3>
              <dl className="mt-4 space-y-1.5 text-sm">
                {[
                  ["Level", String(course.level)],
                  ["Semester", String(course.semester)],
                  ["Lecturer", course.lecturer],
                  ["Department", course.department],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center rounded-lg border bg-card py-16 text-center">
          <BookOpen
            className="h-10 w-10 text-muted-foreground/40"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="mt-4 text-lg font-medium">No courses found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
}
