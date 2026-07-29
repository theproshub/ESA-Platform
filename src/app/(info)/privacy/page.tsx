import type { Metadata } from "next";
import { InfoHero } from "@/components/info-hero";
import { LegalSections, type LegalSection } from "@/components/legal-sections";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/site";
import { breadcrumbSchema, pageSchema } from "@/lib/structured-data";

const title = "Privacy Policy";
const description =
  "How the Economics Students Association collects, uses, and protects your information on the platform.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/privacy",
});

// Keep in step with the `updated` line rendered in the hero below.
const UPDATED = "25 July 2026";

const structuredData = [
  pageSchema({
    path: "/privacy",
    name: title,
    description,
    dateModified: "2026-07-25",
  }),
  breadcrumbSchema([{ name: title, path: "/privacy" }]),
];

const sections: LegalSection[] = [
  {
    heading: "Introduction",
    body: [
      'The Economics Students Association ("ESA", "we", "us") operates this platform for students and members of the Department of Economics at Stella Maris Polytechnic University. This Privacy Policy explains what information we collect, how we use it, and the choices you have.',
    ],
  },
  {
    heading: "Information we collect",
    body: [
      "Account and profile information you provide, such as your name, student ID, email address, phone number, level, and programme of study.",
      "Usage information generated as you interact with the platform, such as the pages you view and the features you use, which helps us keep the service reliable.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "To provide and maintain your access to courses, schedules, announcements, and your digital membership; to send you important association notices; to improve the platform; and to administer association activities.",
    ],
  },
  {
    heading: "Sharing your information",
    body: [
      "We do not sell your personal information. We may share information within the association and with the Department of Economics where necessary to administer membership and academic activities, or where required by law.",
    ],
  },
  {
    heading: "Data retention",
    body: [
      "We keep your information for as long as you remain a member, or as needed to fulfil the purposes described in this policy, unless a longer retention period is required by the University or by law.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You may access, correct, or request deletion of your personal information, and object to certain uses of it, by contacting us using the details below.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "The platform may use essential cookies to keep you signed in and to remember your preferences. We do not use cookies for advertising.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this policy from time to time. Where changes are material, we will communicate them through the platform.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      "If you have any questions about this Privacy Policy, contact us at Econstudentsassn25@gmail.com.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <InfoHero eyebrow="Legal" title="Privacy Policy" updated={UPDATED} />
      <LegalSections sections={sections} />
    </>
  );
}
