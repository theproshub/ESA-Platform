"use client";

import { useState } from "react";
import {
  HandCoins,
  CheckCircle2,
  Clock,
  Search as SearchIcon,
  XCircle,
  FileCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { financialAidRecords, currentStudent } from "@/lib/data";

const statusStyles = {
  approved: { className: "bg-emerald-100 text-emerald-800", icon: CheckCircle2 },
  pending: { className: "bg-amber-100 text-amber-800", icon: Clock },
  "under-review": { className: "bg-blue-100 text-blue-800", icon: SearchIcon },
  denied: { className: "bg-red-100 text-red-800", icon: XCircle },
};

const typeLabels: Record<string, string> = {
  scholarship: "Scholarship",
  grant: "Grant",
  "tuition-waiver": "Tuition Waiver",
  "book-allowance": "Book Allowance",
};

export default function FinancialAidPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered =
    filterStatus === "all"
      ? financialAidRecords
      : financialAidRecords.filter((r) => r.status === filterStatus);

  const totalApproved = financialAidRecords
    .filter((r) => r.status === "approved")
    .reduce((sum, r) => sum + r.amount, 0);

  const pendingCount = financialAidRecords.filter(
    (r) => r.status === "pending" || r.status === "under-review"
  ).length;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Financial Aid</h1>
        <p className="mt-2 text-muted-foreground">
          Track your scholarships, grants, and financial support applications.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-5 text-center">
          <p className="font-serif text-2xl font-bold text-emerald-700">
            {totalApproved.toLocaleString()} LRD
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Total Approved</p>
        </div>
        <div className="rounded-lg border bg-card p-5 text-center">
          <p className="font-serif text-2xl font-bold">{pendingCount}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Pending Applications
          </p>
        </div>
        <div className="rounded-lg border bg-card p-5 text-center">
          <p className="font-serif text-2xl font-bold">{currentStudent.gpa}</p>
          <p className="mt-1 text-sm text-muted-foreground">Current GPA</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
        {["all", "approved", "pending", "under-review", "denied"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              aria-pressed={filterStatus === status}
              className={`rounded-md px-3 py-2 text-sm font-medium capitalize transition-colors ${
                filterStatus === status
                  ? "bg-primary text-primary-foreground"
                  : "border bg-card text-muted-foreground hover:bg-secondary"
              }`}
            >
              {status === "all" ? "All" : status.replace("-", " ")}
            </button>
          )
        )}
      </div>

      <div aria-live="polite">
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((record) => {
              const style = statusStyles[record.status];
              const StatusIcon = style.icon;
              return (
                <article
                  key={record.id}
                  className="rounded-lg border bg-card p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={style.className}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {record.status.replace("-", " ")}
                        </Badge>
                        <Badge variant="outline">
                          {typeLabels[record.type]}
                        </Badge>
                      </div>
                      <p className="mt-3 font-serif text-xl font-semibold">
                        {record.amount.toLocaleString()} {record.currency}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {record.semester}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                      <span className="text-muted-foreground">Criteria</span>
                      <span className="font-medium sm:text-right sm:max-w-[60%]">
                        {record.criteria}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Applied</span>
                      <span className="font-medium">{record.appliedDate}</span>
                    </div>
                    {record.decisionDate && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Decision</span>
                        <span className="font-medium">
                          {record.decisionDate}
                        </span>
                      </div>
                    )}
                  </div>
                  {record.notes && (
                    <p className="mt-4 rounded-md bg-secondary/60 p-3 text-sm leading-relaxed text-muted-foreground">
                      {record.notes}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-lg border bg-card py-16 text-center">
            <FileCheck
              className="h-10 w-10 text-muted-foreground/40"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="mt-4 text-lg font-medium">No records found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
