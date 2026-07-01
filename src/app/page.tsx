"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Megaphone,
  HandCoins,
  GraduationCap,
  Users,
  Globe,
  ChevronDown,
  Quote,
  Mail,
  MapPin,
  Phone,
  Target,
  Eye,
  Heart,
  Award,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── scroll-reveal hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((child) =>
            child.classList.add("visible")
          );
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ─── data ─── */
const features = [
  {
    icon: BookOpen,
    title: "Course Guide",
    description: "Full catalogue by level and semester with lecturer and credit details.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: CalendarDays,
    title: "Academic Schedule",
    description: "Class timetables, exam periods, and the full academic calendar.",
    color: "bg-violet-500/10 text-violet-600",
  },
  {
    icon: Megaphone,
    title: "Announcements",
    description: "Official notices — meetings, deadlines, events, and updates.",
    color: "bg-rose-500/10 text-rose-600",
  },
  {
    icon: HandCoins,
    title: "Financial Aid",
    description: "Apply for scholarships, grants, and track application status.",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: GraduationCap,
    title: "Academic Advising",
    description: "Course planning, registration guidance, and career counseling.",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: Users,
    title: "Mentorship",
    description: "Connect with economists, alumni, and industry professionals.",
    color: "bg-cyan-500/10 text-cyan-600",
  },
  {
    icon: Globe,
    title: "Community Outreach",
    description: "Workshops, seminars, research, and community service initiatives.",
    color: "bg-orange-500/10 text-orange-600",
  },
];

const testimonials = [
  {
    quote:
      "ESA's mentorship program connected me with a senior economist at the Central Bank. That relationship shaped my entire career path and gave me confidence in my studies.",
    name: "Mercy Flomo",
    role: "Level 300 · Economics",
    initials: "MF",
  },
  {
    quote:
      "The financial aid I received through ESA covered my textbooks for two full semesters. Without that support, I would have struggled to keep up with coursework.",
    name: "Emmanuel Togba",
    role: "Level 200 · Economics",
    initials: "ET",
  },
  {
    quote:
      "ESA's advising volunteers helped me navigate course registration when I was completely lost as a freshman. They treated me like family from day one.",
    name: "Princess Kamara",
    role: "Level 400 · Economics",
    initials: "PK",
  },
];

const initiatives = [
  {
    icon: HandCoins,
    title: "Financial Aid & Scholarships",
    description:
      "We provide financial aid to students who demonstrate outstanding academic performance. Our scholarship program targets high-GPA students, recognizing excellence and reducing barriers to education.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
    href: "/dashboard/financial-aid",
  },
  {
    icon: GraduationCap,
    title: "Academic Advising & Support",
    description:
      "ESA volunteers assist students with course planning, registration guidance, and navigating university procedures — ensuring every student makes informed academic decisions.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    href: "/dashboard/advising",
  },
  {
    icon: Users,
    title: "Mentorship Programs",
    description:
      "Through partnerships with the Central Bank of Liberia, Ministry of Finance, and private sector, we connect students with experienced professionals who guide their careers.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop",
    href: "/dashboard/mentorship",
  },
  {
    icon: Globe,
    title: "Community Outreach",
    description:
      "From financial literacy workshops in Monrovia's markets to research symposiums on Liberia's economy, we actively contribute to our community's socio-economic development.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop",
    href: "/dashboard/outreach",
  },
];

/* ─── page ─── */
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <main id="main-content">
        <Hero />
        <InitiativesSection />
        <MissionSection />
        <FeaturesSection />
        <TestimonialsSection />
        <VisionSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

/* ─── navbar ─── */
const navLinks = [
  ["Initiatives", "#initiatives"],
  ["Mission", "#mission"],
  ["Features", "#features"],
  ["Testimonials", "#testimonials"],
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        setHeaderVisible(y < lastScrollY.current || y < 10);
      } else {
        setHeaderVisible(true);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const ids = navLinks.map(([, href]) => href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "border-b border-white/10 bg-[#14293f]/90 shadow-lg backdrop-blur-xl"
            : "bg-transparent"
        } ${headerVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3" aria-label="ESA Platform home">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#b08d35]">
              <span className="text-sm font-bold text-[#14293f]">ESA</span>
            </div>
            <div>
              <span className="text-[15px] font-semibold text-white">ESA Platform</span>
              <span className="hidden text-[11px] text-white/40 sm:block">
                Stella Maris Polytechnic University
              </span>
            </div>
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-8 text-[14px] md:flex" aria-label="Main navigation">
            {navLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className={`relative py-1 transition-colors ${
                  activeSection === href
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {label}
                {activeSection === href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-[#b08d35]" />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden sm:block">
              <Button className="gap-2 bg-[#b08d35] text-[#14293f] hover:bg-[#c9a84c]">
                Open Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            {/* mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-[#14293f]/98 backdrop-blur-xl md:hidden">
          <div className="h-[72px] shrink-0" />
          <nav className="flex flex-1 flex-col items-center justify-center gap-6" aria-label="Mobile navigation">
            {navLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`text-2xl font-semibold transition-colors ${
                  activeSection === href ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {label}
              </a>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="mt-4"
            >
              <Button
                size="lg"
                className="gap-2 bg-[#b08d35] px-8 text-base font-semibold text-[#14293f] hover:bg-[#c9a84c]"
              >
                Open Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

/* ─── hero ─── */
function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1920&h=1080&fit=crop&crop=top"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f33]/90 via-[#14293f]/85 to-[#1b3a5c]/95" />
      </div>

      {/* decorative shapes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-[#b08d35]/8 blur-3xl" />
        <div className="animate-float-reverse absolute right-[10%] top-[25%] h-56 w-56 rounded-full bg-[#b08d35]/10 blur-2xl" />
        <div className="animate-float-slow absolute bottom-[20%] left-[20%] h-40 w-40 rounded-full bg-white/5 blur-2xl" />
        <div className="animate-pulse-glow absolute right-[15%] bottom-[30%] h-64 w-64 rounded-full bg-[#b08d35]/6 blur-3xl" />
      </div>

      {/* grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] text-white/60 backdrop-blur-sm sm:mb-8 sm:px-5 sm:text-[13px]">
          <div className="h-2 w-2 shrink-0 rounded-full bg-[#b08d35] animate-pulse" />
          <span className="hidden text-center sm:inline">Stella Maris Polytechnic University · Arthur Barclay Business College</span>
          <span className="text-center sm:hidden">Stella Maris Polytechnic University</span>
        </div>

        <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Empowering{" "}
          <span className="bg-gradient-to-r from-[#b08d35] via-[#d4b44a] to-[#b08d35] bg-clip-text text-transparent">
            Economists
          </span>
          .
          <br />
          Building Liberia&apos;s Future.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:mt-8 sm:text-lg md:text-xl">
          The official platform of the Economics Students&apos; Association —
          promoting academic excellence, leadership, service, and professional
          development for the next generation of Liberian economists.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:mt-12 sm:flex-row sm:justify-center sm:gap-4">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full gap-2 bg-[#b08d35] px-8 text-base font-semibold text-[#14293f] hover:bg-[#c9a84c] sm:w-auto"
            >
              Enter Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="#initiatives" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="ghost"
              className="w-full gap-2 border border-white/15 text-base text-white/70 hover:bg-white/10 hover:text-white sm:w-auto"
            >
              What We Do
              <ChevronDown className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a
          href="#initiatives"
          className="flex flex-col items-center gap-2 text-white/30 transition-colors hover:text-white/60"
          aria-label="Scroll down"
        >
          <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}

/* ─── features ─── */
function FeaturesSection() {
  const ref = useReveal();
  return (
    <section id="features" className="px-5 py-16 sm:px-6 md:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#b08d35]">
            Platform Features
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Everything you need in one place
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Built to serve the practical needs of economics students and the
            association&apos;s day-to-day operations.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <article
              key={feature.title}
              className={`reveal reveal-delay-${(i % 4) + 1} group cursor-default rounded-xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} transition-transform duration-300 group-hover:scale-110`}
              >
                <feature.icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 font-serif text-lg font-semibold">
                {feature.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── mission ─── */
function MissionSection() {
  const ref = useReveal();
  return (
    <section id="mission" className="relative overflow-hidden bg-[#14293f] px-5 py-16 sm:px-6 md:py-32" ref={ref}>
      {/* decorative */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-10">
        <div className="animate-float-slow absolute right-[10%] top-[15%] h-80 w-80 rounded-full bg-[#b08d35]/30 blur-3xl" />
        <div className="animate-float absolute right-[30%] bottom-[10%] h-60 w-60 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#b08d35]">
            Our Mission
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Who We Are
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/60">
            The Economics Students Association (ESA) of Stella Maris Polytechnic
            University is the official academic and professional body
            representing Economics students within the Arthur Barclay Business
            College.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {[
            {
              icon: Target,
              title: "Academic Excellence",
              description:
                "We are dedicated to promoting academic excellence and professional development, fostering a supportive and collaborative learning environment where every student can thrive.",
            },
            {
              icon: Heart,
              title: "Service & Empowerment",
              description:
                "Beyond academics, ESA empowers students through financial aid, academic support, and voluntary service — helping students navigate university procedures and make informed decisions.",
            },
            {
              icon: Award,
              title: "Leadership & Development",
              description:
                "Through seminars, workshops, mentorship, research, and networking, we equip members to become competent economists, ethical leaders, and agents of sustainable development.",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`reveal reveal-delay-${i + 1} rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#b08d35]/30 hover:bg-white/[0.07]`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#b08d35]/15">
                <item.icon className="h-7 w-7 text-[#b08d35]" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/50">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── initiatives ─── */
function InitiativesSection() {
  return (
    <section id="initiatives" className="px-5 py-16 sm:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <RevealBlock className="mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#b08d35]">
            What We Do
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Empowering students through action
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Our initiatives go beyond the classroom to create real impact in the
            lives of students and our community.
          </p>
        </RevealBlock>

        <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-20">
          {initiatives.map((item, i) => (
            <InitiativeRow key={item.title} item={item} reversed={i % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function InitiativeRow({
  item,
  reversed,
}: {
  item: (typeof initiatives)[number];
  reversed: boolean;
}) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${reversed ? "md:[direction:rtl]" : ""}`}
    >
      <div className={`reveal ${reversed ? "md:[direction:ltr]" : ""}`}>
        <div className="relative aspect-[3/2] overflow-hidden rounded-xl sm:rounded-2xl">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>
      <div className={`reveal reveal-delay-2 ${reversed ? "md:[direction:ltr]" : ""}`}>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#b08d35]/10">
          <item.icon className="h-6 w-6 text-[#b08d35]" strokeWidth={1.75} />
        </div>
        <h3 className="mt-4 font-serif text-2xl font-bold sm:mt-5 sm:text-3xl">
          {item.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground sm:mt-4 sm:text-[16px]">
          {item.description}
        </p>
        <Link
          href={item.href}
          className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-[#b08d35] transition-colors hover:text-[#8a6e2a] sm:mt-6"
        >
          Learn more
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

/* ─── testimonials ─── */
function TestimonialsSection() {
  const ref = useReveal();
  return (
    <section id="testimonials" className="bg-muted px-5 py-16 sm:px-6 md:py-32" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[#b08d35]">
            Student Voices
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Hear from our members
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Real stories from economics students whose lives have been
            impacted by the association.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              className={`reveal reveal-delay-${i + 1} group rounded-2xl border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5`}
            >
              <Quote className="h-8 w-8 text-[#b08d35]/30" strokeWidth={1.5} />
              <blockquote className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-t pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1b3a5c] text-sm font-semibold text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="text-[14px] font-semibold">{t.name}</p>
                  <p className="text-[13px] text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── vision ─── */
function VisionSection() {
  const ref = useReveal();
  return (
    <section className="relative overflow-hidden px-5 py-16 sm:px-6 md:py-32" ref={ref}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b08d35]/5 blur-3xl sm:h-[500px] sm:w-[500px]" />
      </div>
      <div className="reveal relative mx-auto max-w-3xl text-center">
        <Eye className="mx-auto h-10 w-10 text-[#b08d35]" strokeWidth={1.25} />
        <h2 className="mt-6 text-3xl font-bold sm:text-4xl">Our Vision</h2>
        <p className="mt-6 font-serif text-xl leading-relaxed text-muted-foreground sm:text-2xl">
          &ldquo;To build a vibrant community of Economics students who excel
          academically, serve selflessly, and contribute innovative solutions to
          Liberia&apos;s socio-economic development.&rdquo;
        </p>
        <div className="mx-auto mt-8 h-1 w-16 rounded-full bg-[#b08d35]" />
      </div>
    </section>
  );
}

/* ─── cta ─── */
function CTASection() {
  const ref = useReveal();
  return (
    <section className="relative overflow-hidden bg-[#14293f] px-5 py-16 sm:px-6 md:py-32" ref={ref}>
      {/* decorative */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute left-[5%] top-[10%] h-48 w-48 rounded-full bg-[#b08d35]/10 blur-3xl" />
        <div className="animate-float-reverse absolute right-[5%] bottom-[10%] h-56 w-56 rounded-full bg-[#b08d35]/8 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="reveal relative mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Ready to join the community?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/60 sm:mt-6 sm:text-lg">
          Access your courses, track financial aid, connect with mentors, and
          stay informed with the latest from the Economics Students&apos;
          Association.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full gap-2 bg-[#b08d35] px-8 text-base font-semibold text-[#14293f] hover:bg-[#c9a84c] sm:w-auto"
            >
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="#features" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="ghost"
              className="w-full border border-white/15 text-base text-white/60 hover:bg-white/10 hover:text-white sm:w-auto"
            >
              Explore Features
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── footer ─── */
function Footer() {
  return (
    <footer className="border-t bg-[#0d1f33] px-5 py-12 text-white/50 sm:px-6 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 md:gap-12 lg:grid-cols-4">
        {/* branding */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#b08d35]">
              <span className="text-sm font-bold text-[#14293f]">ESA</span>
            </div>
            <div>
              <p className="text-[15px] font-semibold text-white">ESA Platform</p>
              <p className="text-[12px] text-white/30">Stella Maris Polytechnic University</p>
            </div>
          </div>
          <p className="mt-4 text-[14px] leading-relaxed">
            The official platform of the Economics Students&apos; Association,
            Arthur Barclay Business College.
          </p>
        </div>

        {/* quick links */}
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-wider text-white/70">
            Quick Links
          </p>
          <ul className="mt-4 space-y-3 text-[14px]">
            {["Dashboard", "Courses", "Schedule", "Announcements"].map((link) => (
              <li key={link}>
                <Link
                  href={`/dashboard${link === "Dashboard" ? "" : `/${link.toLowerCase()}`}`}
                  className="transition-colors hover:text-white"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* programs */}
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-wider text-white/70">
            Programs
          </p>
          <ul className="mt-4 space-y-3 text-[14px]">
            {[
              ["Financial Aid", "/dashboard/financial-aid"],
              ["Academic Advising", "/dashboard/advising"],
              ["Mentorship", "/dashboard/mentorship"],
              ["Community Outreach", "/dashboard/outreach"],
            ].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="transition-colors hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* contact */}
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-wider text-white/70">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-[14px]">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />
              <span>Arthur Barclay Business College, Monrovia, Liberia</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              economicsstudentsassociation25@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              0777 130 331
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              0888 322 45
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-8">
        <div className="flex flex-col items-center justify-between gap-4 text-[13px] md:flex-row">
          <p>
            &copy; 2026 Economics Students&apos; Association — Stella Maris
            Polytechnic University. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="cursor-default transition-colors hover:text-white">
              Privacy Policy
            </span>
            <span className="cursor-default transition-colors hover:text-white">
              Terms of Use
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── helper components ─── */
function RevealBlock({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useReveal();
  return (
    <div ref={ref} className={className}>
      <div className="reveal">{children}</div>
    </div>
  );
}
