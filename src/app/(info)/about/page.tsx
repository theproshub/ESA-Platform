import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  Megaphone,
  CreditCard,
  Users,
  FileText,
  ArrowRight,
} from "lucide-react";
import { InfoHero } from "@/components/info-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About — Economics Students Association",
  description:
    "Learn about the Economics Students Association at Stella Maris Polytechnic University — our mission, community, and what the platform offers.",
};

const offerings = [
  {
    icon: BookOpen,
    title: "Course Guide",
    description:
      "A complete catalogue of economics courses, organised by level and semester.",
  },
  {
    icon: CalendarDays,
    title: "Academic Schedule",
    description:
      "Weekly timetables, examination periods, and the full academic calendar.",
  },
  {
    icon: Megaphone,
    title: "Announcements",
    description: "Official notices, meetings, deadlines, and association events.",
  },
  {
    icon: CreditCard,
    title: "Digital Membership",
    description: "A verified membership card accessible on any device.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "A connected network of economics students and association committees.",
  },
  {
    icon: FileText,
    title: "Academic Resources",
    description:
      "Past questions, lecture notes, and study materials curated by the academic committee.",
  },
];

export default function AboutPage() {
  return (
    <>
      <InfoHero
        eyebrow="About"
        title="About the Association"
        description="The academic and social home for economics students at Stella Maris Polytechnic University."
      />

      <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 sm:space-y-12 sm:px-6 sm:py-14">
        <section>
          <h2 className="text-2xl font-semibold tracking-[-0.02em] sm:text-[28px]">
            Who we are
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            The Economics Students Association (ESA) is the official student body
            for students of the Department of Economics at Stella Maris
            Polytechnic University. We bring together students across all levels
            to support their academic journey and to build a connected, engaged
            community.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-[-0.02em] sm:text-[28px]">
            Our mission
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            Guided by our motto — <em>Non Scholae Sed Vitae Discimu</em>, &ldquo;we
            learn not for school but for life&rdquo; — the association exists to
            enrich the academic experience of economics students, represent their
            interests, and prepare them for life beyond the classroom through
            knowledge sharing, mentorship, and collaboration.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-[-0.02em] sm:text-[28px]">
            What the platform offers
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {offerings.map((item) => (
              <div key={item.title} className="flex gap-3">
                <item.icon
                  className="h-5 w-5 shrink-0 text-brand"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-base font-semibold tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-card p-6 ring-1 ring-border sm:p-8">
          <h2 className="text-2xl font-semibold tracking-[-0.02em] sm:text-[28px]">
            Get involved
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            Become a verified member to access your digital membership card, stay
            informed with announcements, and connect with the economics community.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/membership">
              <Button className="w-full gap-2 sm:w-auto">
                <CreditCard className="h-4 w-4" strokeWidth={1.75} />
                Membership Card
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="w-full gap-2 sm:w-auto">
                Contact us
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
