import type { Metadata } from "next";
import { InfoHero } from "@/components/info-hero";
import { LegalSections, type LegalSection } from "@/components/legal-sections";

export const metadata: Metadata = {
  title: "Terms of Use — Economics Students Association",
  description:
    "The terms that govern your use of the Economics Students Association platform.",
};

const sections: LegalSection[] = [
  {
    heading: "Acceptance of terms",
    body: [
      "By accessing or using the Economics Students Association platform, you agree to these Terms of Use. If you do not agree, please do not use the platform.",
    ],
  },
  {
    heading: "Eligibility and accounts",
    body: [
      "The platform is intended for students and members of the Economics Students Association at Stella Maris Polytechnic University. You are responsible for keeping your account information accurate and for safeguarding your access.",
    ],
  },
  {
    heading: "Acceptable use",
    body: [
      "You agree to use the platform only for lawful purposes and in a manner consistent with the values of the association. You will not misuse the platform, disrupt its operation, or attempt to gain unauthorised access to any part of it.",
    ],
  },
  {
    heading: "Membership",
    body: [
      "Digital membership and its associated benefits are provided to verified members and may be updated by the association from time to time.",
    ],
  },
  {
    heading: "Content and intellectual property",
    body: [
      "Course information, announcements, and materials on the platform are provided for the academic use of members. The association's name, logo, and crest are the property of the Economics Students Association and may not be used without permission.",
    ],
  },
  {
    heading: "Disclaimers",
    body: [
      'The platform is provided on an "as is" and "as available" basis. While we work to keep information accurate and current, we do not guarantee that it is complete or free of errors.',
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the fullest extent permitted by applicable law, the association shall not be liable for any loss or damage arising from your use of, or inability to use, the platform.",
    ],
  },
  {
    heading: "Changes to the platform and terms",
    body: [
      "We may modify the platform or these terms at any time. Your continued use of the platform after changes take effect constitutes acceptance of the updated terms.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      "Questions about these Terms of Use can be sent to Econstudentsassn25@gmail.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <InfoHero eyebrow="Legal" title="Terms of Use" updated="25 July 2026" />
      <LegalSections sections={sections} />
    </>
  );
}
