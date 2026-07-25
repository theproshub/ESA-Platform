import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  CalendarDays,
  Megaphone,
  CreditCard,
  Users,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const features = [
  {
    icon: BookOpen,
    image: "/feature-courses.webp",
    title: "Course Guide",
    description:
      "Browse courses organised by level and semester with full lecturer and credit hour details.",
  },
  {
    icon: CalendarDays,
    image: "/feature-schedule.webp",
    title: "Academic Schedule",
    description:
      "View your weekly timetable, examination periods, and the full academic calendar.",
  },
  {
    icon: Megaphone,
    image: "/feature-announcements.webp",
    title: "Announcements",
    description:
      "Read official notices from the association — meetings, deadlines, events, and more.",
  },
  {
    icon: CreditCard,
    image: "/feature-membership.webp",
    title: "Digital Membership",
    description:
      "Access your verified ESA membership card on any device, at any time.",
  },
  {
    icon: Users,
    image: "/feature-community.webp",
    title: "Community",
    description:
      "Stay connected with fellow economics students and engage with association committees.",
  },
  {
    icon: FileText,
    image: "/feature-resources.webp",
    title: "Academic Resources",
    description:
      "Access past questions, lecture notes, and study materials curated by the academic committee.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main id="main-content">
        <section className="relative isolate overflow-hidden bg-primary px-4 py-16 sm:px-6 md:py-28">
          {/* Radial glow behind the crest */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-8 h-60 w-60 -translate-x-1/2 rounded-full sm:top-14 sm:h-80 sm:w-80"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--accent) 55%, transparent) 0%, transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="relative mx-auto flex h-28 w-28 items-center justify-center sm:h-36 sm:w-36">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-white/[0.07] ring-1 ring-white/15 backdrop-blur-sm"
              />
              <Image
                src="/esa-logo.png"
                alt="Economics Students Association crest"
                width={144}
                height={168}
                priority
                quality={100}
                className="relative h-20 w-auto object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.4)] sm:h-24"
              />
            </div>
            <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.22em] text-primary-foreground/50 sm:mt-8 sm:text-xs">
              Stella Maris Polytechnic University
            </p>
            <div
              aria-hidden="true"
              className="mx-auto mt-4 h-px w-12 bg-gradient-to-r from-transparent via-accent to-transparent"
            />
            <h1 className="mt-4 text-3xl font-bold text-primary-foreground sm:mt-5 sm:text-4xl md:text-5xl">
              Economics Students Association
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/70 sm:mt-6 sm:text-lg">
              Your academic companion. Access courses, schedules,
              and association resources — all in one place.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-center">
              <Link href="/dashboard/courses">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full gap-2 text-base font-semibold sm:w-auto"
                >
                  <BookOpen className="h-4 w-4" />
                  View Courses
                </Button>
              </Link>
              <Link href="/dashboard/schedule">
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full gap-2 text-base text-primary-foreground/70 hover:bg-white/10 hover:text-primary-foreground sm:w-auto"
                >
                  <CalendarDays className="h-4 w-4" />
                  Academic Schedule
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b bg-card px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 sm:gap-y-8 md:grid-cols-4">
            {[
              { value: "500+", label: "Active Members" },
              { value: "45", label: "Courses Listed" },
              { value: "12", label: "Committees" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[13px] text-muted-foreground sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="px-4 py-14 sm:px-6 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold sm:text-3xl">
                What the platform offers
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:mt-4 sm:text-lg">
                Built to serve the practical needs of economics students
                and the association&apos;s day-to-day operations.
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-2xl gap-5 sm:mt-16 sm:gap-6 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[3/2] overflow-hidden bg-secondary">
                    <Image
                      src={feature.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2">
                      <feature.icon
                        className="h-5 w-5 shrink-0 text-accent"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <h3 className="font-serif text-lg font-semibold sm:text-xl">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="border-t bg-primary px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
              Join the Association
            </h2>
            <p className="mt-3 text-base leading-relaxed text-primary-foreground/70 sm:mt-4 sm:text-lg">
              Become a verified member to access your digital membership card,
              stay informed with announcements, and connect with the economics community.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-center">
              <Link href="/dashboard/membership">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full gap-2 text-base font-semibold sm:w-auto"
                >
                  <CreditCard className="h-4 w-4" />
                  Membership Card
                </Button>
              </Link>
              <Link href="/dashboard/announcements">
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full gap-2 text-base text-primary-foreground/70 hover:bg-white/10 hover:text-primary-foreground sm:w-auto"
                >
                  <Megaphone className="h-4 w-4" />
                  Announcements
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
