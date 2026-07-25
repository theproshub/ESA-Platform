import { Shield, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { currentStudent } from "@/lib/data";

export default function MembershipPage() {
  const memberSince = new Date(currentStudent.joinDate).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <div className="space-y-5 sm:space-y-8">
      <PageHeader
        title="Membership Card"
        description="Your verified digital ESA membership identification."
      />

      <div className="mx-auto max-w-md">
        <div
          className="overflow-hidden rounded-xl shadow-lg"
          role="img"
          aria-label={`ESA membership card for ${currentStudent.firstName} ${currentStudent.lastName}, Student ID ${currentStudent.studentId}, Level ${currentStudent.level}, ${currentStudent.department} department, active member since ${memberSince}`}
        >
          <div className="bg-primary p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-white/20 sm:h-8 sm:w-8">
                  <span className="text-[10px] font-bold text-primary-foreground sm:text-xs">
                    ESA
                  </span>
                </div>
                <p className="text-[12px] text-primary-foreground/60 sm:text-sm">
                  Economics Students Association
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-200 sm:px-2.5 sm:py-1 sm:text-xs">
                {currentStudent.membershipStatus === "active"
                  ? "Active"
                  : "Inactive"}
              </span>
            </div>

            <div className="mt-4 flex gap-3 sm:mt-6 sm:gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white/15 text-xl font-bold text-primary-foreground sm:h-16 sm:w-16 sm:text-2xl"
                aria-hidden="true"
              >
                {currentStudent.firstName[0]}
                {currentStudent.lastName[0]}
              </div>
              <div className="min-w-0">
                <p className="text-lg font-bold text-primary-foreground sm:text-xl">
                  {currentStudent.firstName} {currentStudent.lastName}
                </p>
                <p className="mt-0.5 text-[13px] text-primary-foreground/60 sm:text-sm">
                  {currentStudent.program}
                </p>
                <p className="mt-0.5 font-mono text-[13px] text-primary-foreground/50 sm:mt-1 sm:text-sm">
                  {currentStudent.studentId}
                </p>
              </div>
            </div>

            <div className="mt-4 border-t border-white/10 pt-4 sm:mt-6 sm:pt-5">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  ["Level", String(currentStudent.level)],
                  ["Department", currentStudent.department],
                  ["Member Since", memberSince],
                  ["Academic Year", "2026/2027"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[11px] text-primary-foreground/40 sm:text-xs">
                      {label}
                    </p>
                    <p className="mt-0.5 text-[13px] font-medium text-primary-foreground/90 sm:text-sm">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center rounded-md bg-white/10 py-3 sm:mt-6 sm:py-4">
              <div className="grid grid-cols-7 gap-[3px]" aria-hidden="true">
                {Array.from({ length: 49 }, (_, i) => {
                  const row = Math.floor(i / 7);
                  const col = i % 7;
                  const isFilled =
                    row === 0 ||
                    row === 6 ||
                    col === 0 ||
                    col === 6 ||
                    (row >= 2 && row <= 4 && col >= 2 && col <= 4);
                  return (
                    <div
                      key={i}
                      className={`h-[5px] w-[5px] rounded-[1px] ${
                        isFilled ? "bg-white/60" : "bg-white/15"
                      }`}
                    />
                  );
                })}
              </div>
              <p className="ml-4 text-[11px] text-primary-foreground/30 sm:text-xs">
                Scan to verify
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center sm:mt-6">
          <Button variant="outline" className="w-full gap-2 sm:w-auto">
            <Download className="h-4 w-4" strokeWidth={1.75} />
            Download Card
          </Button>
        </div>
      </div>

      <section
        className="mx-auto max-w-md rounded-lg border bg-card p-4 sm:p-6"
        aria-labelledby="benefits-heading"
      >
        <h2
          id="benefits-heading"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <Shield className="h-5 w-5 text-accent" strokeWidth={1.75} />
          Membership Benefits
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
          {[
            "Access to ESA events, workshops, and seminars",
            "Voting rights in ESA elections",
            "Access to study materials and past questions",
            "Discounts at partner establishments",
            "Career mentorship and networking opportunities",
          ].map((benefit) => (
            <li key={benefit} className="flex items-start gap-3">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              {benefit}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
