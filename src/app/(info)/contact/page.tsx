import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Building2, Clock, ArrowRight } from "lucide-react";
import { InfoHero } from "@/components/info-hero";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, siteConfig } from "@/lib/site";
import { breadcrumbSchema, pageSchema } from "@/lib/structured-data";

const title = "Contact";
const description =
  "Get in touch with the Economics Students Association at Stella Maris Polytechnic University — email, office hours, and location.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/contact",
});

const structuredData = [
  pageSchema({
    type: "ContactPage",
    path: "/contact",
    name: "Contact the Association",
    description,
  }),
  breadcrumbSchema([{ name: "Contact", path: "/contact" }]),
];

const EMAIL = siteConfig.email;

const details = [
  {
    icon: Mail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: Building2,
    label: "University",
    value: siteConfig.university,
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.location,
  },
  {
    icon: Clock,
    label: "Office hours",
    value: "Monday – Friday, 9:00am – 4:00pm",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <InfoHero
        eyebrow="Contact"
        title="Get in touch"
        description="We'd love to hear from you — whether it's a question, an idea, or a membership enquiry."
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-4 sm:grid-cols-2">
          {details.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 rounded-lg bg-card p-5 ring-1 ring-border"
            >
              <item.icon
                className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="label text-muted-foreground">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-1.5 block break-all text-[15px] font-medium transition-colors hover:text-accent"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-1.5 text-[15px] font-medium">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-card p-6 text-center ring-1 ring-border sm:p-8">
          <h2 className="text-2xl font-semibold tracking-[-0.02em] sm:text-[28px]">
            Send us a message
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            The quickest way to reach the association is by email. We aim to
            respond to enquiries within a few working days.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={`mailto:${EMAIL}`}>
              <Button className="w-full gap-2 sm:w-auto">
                <Mail className="h-4 w-4" strokeWidth={1.75} />
                Email the association
              </Button>
            </a>
            <Link href="/dashboard/membership">
              <Button variant="outline" className="w-full gap-2 sm:w-auto">
                Membership
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
