import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  CalendarDays,
  Megaphone,
  CreditCard,
  Users,
  FileText,
  HandCoins,
  GraduationCap,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionMark } from "@/components/star-mark";
import { IsLmPlot } from "@/components/is-lm-plot";

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

const services = [
  {
    icon: HandCoins,
    image: "/service-financial-aid.webp",
    title: "Financial Aid",
    href: "/dashboard/financial-aid",
    description:
      "Scholarships, grants, tuition waivers, and book allowances to support your studies.",
  },
  {
    icon: GraduationCap,
    image: "/service-advising.webp",
    title: "Advising",
    href: "/dashboard/advising",
    description:
      "Book academic advising for course planning, registration, and career guidance.",
  },
  {
    icon: Users,
    image: "/service-mentorship.webp",
    title: "Mentorship",
    href: "/dashboard/mentorship",
    description:
      "Get matched with mentors from academia and industry for guidance and networking.",
  },
  {
    icon: Globe,
    image: "/service-outreach.webp",
    title: "Outreach",
    href: "/dashboard/outreach",
    description:
      "Workshops, seminars, community service, and networking events for members.",
  },
];

const stats = [
  { value: "500+", label: "Active members" },
  { value: "50", label: "Courses listed" },
  { value: "12", label: "Committees" },
  { value: "98%", label: "Satisfaction rate" },
];

// Placeholder alumni testimonials. Names, quotes, and sectors are invented and
// must be replaced with real, signed-off quotes before launch. Employers are
// deliberately unnamed — do not attach a real institution to an invented quote.
const testimonials = [
  {
    quote:
      "Four years into the job, the econometrics I first practised in ESA study circles is what I use to price risk every week. I walked into my first day already knowing how to defend a number.",
    name: "Aminata Konneh",
    role: "Financial Analyst",
    detail: "Commercial banking · Class of 2021",
    initials: "AK",
  },
  {
    quote:
      "I went straight from my final symposium paper into a full-time research post. The habit of writing, presenting, and taking hard questions in front of peers is the whole job now.",
    name: "Emmanuel Tarr",
    role: "Research Economist",
    detail: "Central banking · Class of 2020",
    initials: "ET",
  },
  {
    quote:
      "My ESA mentor introduced me to the team I now work with permanently. Six years on, I still bring students from the association in for attachments — the network runs both ways.",
    name: "Grace Wesseh",
    role: "Policy Analyst",
    detail: "Public sector · Class of 2022",
    initials: "GW",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main id="main-content">
        <section className="relative isolate overflow-hidden bg-brand px-4 pb-28 pt-12 sm:px-6 md:pb-40 md:pt-16">
          {/* The crest's own IS–LM diagram, redrawn across the foot of the band. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-full max-w-5xl px-4 text-white/40 sm:px-6"
          >
            <IsLmPlot />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            {/* The crest lives in the header now; the headline opens the band. */}
            <p className="label text-brand-foreground/50">
              Stella Maris Polytechnic University
            </p>
            <h1 className="mt-5 text-[38px] font-semibold leading-[1.05] tracking-[-0.03em] text-brand-foreground sm:text-[52px] md:text-[58px]">
              Economics Students Association
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-brand-foreground/70 sm:mt-7 sm:text-lg">
              Your academic companion. Access courses, schedules, and
              association resources — all in one place.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:items-center sm:justify-center">
              <Link href="/dashboard/courses">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full gap-2 font-semibold sm:w-auto"
                >
                  <BookOpen className="h-4 w-4" />
                  View Courses
                </Button>
              </Link>
              <Link href="/dashboard/schedule">
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full gap-2 text-brand-foreground/75 hover:bg-white/10 hover:text-brand-foreground sm:w-auto"
                >
                  <CalendarDays className="h-4 w-4" />
                  Academic Schedule
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Read as a row of a statistical table: figures set in mono, ruled off. */}
        <section
          aria-label="Association at a glance"
          className="border-y bg-card px-4 py-10 sm:px-6 sm:py-12"
        >
          <dl className="mx-auto grid max-w-4xl grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-border">
            {stats.map((stat) => (
              <div key={stat.label} className="px-2 text-center">
                <dd className="figure text-[32px] font-semibold leading-none sm:text-[40px]">
                  {stat.value}
                </dd>
                <dt className="label mt-2.5 text-muted-foreground">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </section>

        <section id="features" className="px-4 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-2xl text-center">
              <SectionMark>The platform</SectionMark>
              <h2 className="mt-5 text-[30px] font-semibold tracking-[-0.025em] sm:text-[38px]">
                What the platform offers
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Built to serve the practical needs of economics students and the
                association&apos;s day-to-day operations.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-2xl gap-5 sm:mt-16 sm:gap-6 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="group overflow-hidden rounded-xl bg-card ring-1 ring-border transition-colors hover:ring-foreground/25"
                >
                  <div className="relative aspect-[3/2] overflow-hidden bg-secondary">
                    <Image
                      src={feature.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2.5">
                      <feature.icon
                        className="h-[18px] w-[18px] shrink-0 text-brand"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <h3 className="text-lg font-semibold tracking-[-0.015em] sm:text-xl">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand px-4 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-2xl text-center">
              <SectionMark tone="brand">Alumni</SectionMark>
              <h2 className="mt-5 text-[30px] font-semibold tracking-[-0.025em] text-brand-foreground sm:text-[38px]">
                From students to professionals
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brand-foreground/70 sm:text-lg">
                Graduates of the programme, now in full-time roles across
                economics, finance, and policy.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-2xl gap-5 sm:mt-16 sm:gap-6 md:max-w-none md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <figure
                  key={testimonial.name}
                  className="flex flex-col rounded-xl bg-white/[0.04] p-6 ring-1 ring-brand-rule"
                >
                  <span
                    className="font-serif text-5xl leading-none text-brand-foreground/20"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="mt-1 flex-1 text-[15px] leading-relaxed text-brand-foreground/85">
                    {testimonial.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-brand-rule pt-5">
                    <div
                      className="figure flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-[13px] font-semibold text-brand-foreground"
                      aria-hidden="true"
                    >
                      {testimonial.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-brand-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-[13px] text-brand-foreground/60">
                        {testimonial.role}
                      </p>
                      <p className="mt-0.5 text-[12px] leading-snug text-brand-foreground/45">
                        {testimonial.detail}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section
          id="support"
          className="border-t bg-secondary/40 px-4 py-16 sm:px-6 md:py-24"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-2xl text-center">
              <SectionMark>Support</SectionMark>
              <h2 className="mt-5 text-[30px] font-semibold tracking-[-0.025em] sm:text-[38px]">
                Student support &amp; community
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Beyond the classroom — support and opportunities to help you
                thrive throughout your studies.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-2xl gap-5 sm:mt-16 sm:gap-6 md:max-w-none md:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group overflow-hidden rounded-xl bg-card ring-1 ring-border transition-colors hover:ring-foreground/25"
                >
                  <div className="relative aspect-[3/2] overflow-hidden bg-secondary">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2.5">
                      <service.icon
                        className="h-[18px] w-[18px] shrink-0 text-brand"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <h3 className="text-lg font-semibold tracking-[-0.015em] sm:text-xl">
                        {service.title}
                      </h3>
                    </div>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="about"
          className="border-t bg-brand px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="mx-auto max-w-2xl text-center">
            <SectionMark tone="brand">Membership</SectionMark>
            <h2 className="mt-5 text-[30px] font-semibold tracking-[-0.025em] text-brand-foreground sm:text-[38px]">
              Join the association
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-foreground/70 sm:text-lg">
              Become a verified member to access your digital membership card,
              stay informed with announcements, and connect with the economics
              community.
            </p>
            <div className="mt-9 flex flex-col items-stretch gap-3 sm:mt-11 sm:flex-row sm:items-center sm:justify-center">
              <Link href="/dashboard/membership">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full gap-2 font-semibold sm:w-auto"
                >
                  <CreditCard className="h-4 w-4" />
                  Membership Card
                </Button>
              </Link>
              <Link href="/dashboard/announcements">
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full gap-2 text-brand-foreground/75 hover:bg-white/10 hover:text-brand-foreground sm:w-auto"
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
