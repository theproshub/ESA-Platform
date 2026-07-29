"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Search as SearchIcon,
  XCircle,
  FileCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/empty-state";
import { financialAidRecords, currentStudent } from "@/lib/data";
import { statusTone } from "@/lib/status";
import { formatDate } from "@/lib/utils";

const statusStyles = {
  approved: { className: statusTone.positive, icon: CheckCircle2 },
  pending: { className: statusTone.attention, icon: Clock },
  "under-review": { className: statusTone.info, icon: SearchIcon },
  denied: { className: statusTone.critical, icon: XCircle },
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
      <PageHeader
        title="Financial Aid"
        description="Track your scholarships, grants, and financial support applications."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-card p-5 text-center ring-1 ring-border">
          <p className="figure text-[28px] font-semibold text-positive">
            {totalApproved.toLocaleString()} LRD
          </p>
          <p className="label mt-2 text-muted-foreground">Total approved</p>
        </div>
        <div className="rounded-lg bg-card p-5 text-center ring-1 ring-border">
          <p className="figure text-[28px] font-semibold">{pendingCount}</p>
          <p className="label mt-2 text-muted-foreground">Pending applications</p>
        </div>
        <div className="rounded-lg bg-card p-5 text-center ring-1 ring-border">
          <p className="figure text-[28px] font-semibold">{currentStudent.gpa}</p>
          <p className="label mt-2 text-muted-foreground">Current GPA</p>
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
                  : "bg-card text-muted-foreground ring-1 ring-border hover:bg-secondary"
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
                  className="rounded-lg bg-card p-5 ring-1 ring-border"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={`label ${style.className}`}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {record.status.replace("-", " ")}
                        </Badge>
                        <Badge variant="outline" className="label">
                          {typeLabels[record.type]}
                        </Badge>
                      </div>
                      <p className="figure mt-3 text-2xl font-semibold">
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
                      <span className="figure font-medium">
                        {formatDate(record.appliedDate)}
                      </span>
                    </div>
                    {record.decisionDate && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Decision</span>
                        <span className="figure font-medium">
                          {formatDate(record.decisionDate)}
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
          <EmptyState
            icon={FileCheck}
            title="No records found"
            description="Try adjusting your filter."
          />
        )}
      </div>
    </div>
  );
}
