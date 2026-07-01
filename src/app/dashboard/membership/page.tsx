import { Shield, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { currentStudent } from "@/lib/data";

export default function MembershipPage() {
  const memberSince = new Date(currentStudent.joinDate).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Membership Card</h1>
        <p className="mt-2 text-muted-foreground">
          Your verified digital ESA membership identification.
        </p>
      </header>

      <div className="mx-auto max-w-md">
        <div
          className="overflow-hidden rounded-xl shadow-lg"
          role="img"
          aria-label={`ESA membership card for ${currentStudent.firstName} ${currentStudent.lastName}, Student ID ${currentStudent.studentId}, Level ${currentStudent.level}, ${currentStudent.department} department, active member since ${memberSince}`}
        >
          <div className="bg-primary p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-white/20">
                  <span className="text-xs font-bold text-primary-foreground">
                    ESA
                  </span>
                </div>
                <div>
                  <p className="text-sm text-primary-foreground/60">
                    Economics Students&apos; Association
                  </p>
                  <p className="text-[11px] text-primary-foreground/40">
                    Stella Maris Polytechnic University
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-emerald-200">
                {currentStudent.membershipStatus === "active"
                  ? "Active"
                  : "Inactive"}
              </span>
            </div>

            <div className="mt-6 flex gap-4">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-white/15 text-2xl font-bold text-primary-foreground"
                aria-hidden="true"
              >
                {currentStudent.firstName[0]}
                {currentStudent.lastName[0]}
              </div>
              <div>
                <p className="text-xl font-bold text-primary-foreground">
                  {currentStudent.firstName} {currentStudent.lastName}
                </p>
                <p className="mt-0.5 text-sm text-primary-foreground/60">
                  {currentStudent.program}
                </p>
                <p className="mt-1 font-mono text-sm text-primary-foreground/50">
                  {currentStudent.studentId}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  ["Level", String(currentStudent.level)],
                  ["Department", currentStudent.department],
                  ["Member Since", memberSince],
                  ["Academic Year", "2026/2027"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs text-primary-foreground/40">
                      {label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-primary-foreground/90">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center rounded-md bg-white/10 py-4">
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
              <p className="ml-4 text-xs text-primary-foreground/30">
                Scan to verify
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" strokeWidth={1.75} />
            Download Card
          </Button>
        </div>
      </div>

      <section
        className="mx-auto max-w-md rounded-lg border bg-card p-6"
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
