import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Megaphone,
  CreditCard,
  Users,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: BookOpen,
    title: "Course Guide",
    description:
      "Browse courses organised by level and semester with full lecturer and credit hour details.",
  },
  {
    icon: CalendarDays,
    title: "Academic Schedule",
    description:
      "View your weekly timetable, examination periods, and the full academic calendar.",
  },
  {
    icon: Megaphone,
    title: "Announcements",
    description:
      "Read official notices from the association — meetings, deadlines, events, and more.",
  },
  {
    icon: CreditCard,
    title: "Digital Membership",
    description:
      "Access your verified ESA membership card on any device, at any time.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Stay connected with fellow economics students and engage with association committees.",
  },
  {
    icon: FileText,
    title: "Academic Resources",
    description:
      "Access past questions, lecture notes, and study materials curated by the academic committee.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="ESA Platform home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded bg-primary">
              <span className="text-xs font-bold text-primary-foreground">
                ESA
              </span>
            </div>
            <span className="text-base font-semibold">ESA Platform</span>
          </Link>
          <nav
            className="hidden items-center gap-8 text-[15px] md:flex"
            aria-label="Landing page navigation"
          >
            <a
              href="#features"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </a>
          </nav>
          <Link href="/dashboard">
            <Button className="gap-2">
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main id="main-content">
        <section className="bg-primary px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-primary-foreground md:text-5xl">
              Economics Students&apos; Association
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/70">
              Your academic companion. Access courses, schedules,
              and association resources — all in one place.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2 text-base font-semibold"
                >
                  Go to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#features">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-base text-primary-foreground/70 hover:bg-white/10 hover:text-primary-foreground"
                >
                  Learn more
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="border-b bg-card px-6 py-14">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-y-8 md:grid-cols-4">
            {[
              { value: "500+", label: "Active Members" },
              { value: "45", label: "Courses Listed" },
              { value: "12", label: "Committees" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold">
                What the platform offers
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Built to serve the practical needs of economics students
                and the association&apos;s day-to-day operations.
              </p>
            </div>
            <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <article key={feature.title}>
                  <feature.icon
                    className="h-6 w-6 text-accent"
                    strokeWidth={1.75}
                  />
                  <h3 className="mt-4 font-serif text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="border-t bg-primary px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-primary-foreground">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-primary-foreground/70">
              Sign in to your dashboard to view courses, check your schedule,
              and stay informed with the latest association updates.
            </p>
            <Link href="/dashboard" className="mt-10 inline-block">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 text-base font-semibold"
              >
                Open Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t bg-card px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>
            &copy; 2026 Economics Students&apos; Association. All rights
            reserved.
          </p>
          <nav aria-label="Footer navigation" className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
            <span>Contact</span>
          </nav>
        </div>
      </footer>
    </div>
  );
}
