/**
 * schema.org payloads for the public site. The organisation and website nodes
 * are emitted once from the root layout and carry stable `@id`s, so page-level
 * nodes reference them instead of repeating the association's details.
 */
import { absoluteUrl, siteConfig, siteUrl } from "./site";

export type JsonLdNode = Record<string, unknown>;

export const organizationId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;

const organization: JsonLdNode = {
  "@type": "EducationalOrganization",
  "@id": organizationId,
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: absoluteUrl("/"),
  description: siteConfig.description,
  slogan: siteConfig.motto,
  email: siteConfig.email,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl(siteConfig.logo.path),
    width: siteConfig.logo.width,
    height: siteConfig.logo.height,
    caption: `${siteConfig.name} crest`,
  },
  image: absoluteUrl(siteConfig.logo.path),
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: siteConfig.university,
    department: {
      "@type": "Organization",
      name: siteConfig.college,
    },
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.location,
    addressLocality: siteConfig.locality,
    addressCountry: siteConfig.country,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "student enquiries",
    email: siteConfig.email,
    availableLanguage: "English",
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...siteConfig.officeHours.days],
      opens: siteConfig.officeHours.opens,
      closes: siteConfig.officeHours.closes,
    },
  },
};

const website: JsonLdNode = {
  "@type": "WebSite",
  "@id": websiteId,
  url: absoluteUrl("/"),
  name: siteConfig.name,
  alternateName: `${siteConfig.shortName} Platform`,
  description: siteConfig.description,
  inLanguage: "en",
  publisher: { "@id": organizationId },
};

/** The sitewide graph, rendered once from the root layout. */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [organization, website],
};

type Crumb = { name: string; path: string };

export function breadcrumbSchema(trail: Crumb[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })
    ),
  };
}

export function pageSchema({
  type = "WebPage",
  path,
  name,
  description,
  dateModified,
}: {
  type?: "WebPage" | "AboutPage" | "ContactPage";
  path: string;
  name: string;
  description: string;
  /** ISO 8601 date, for pages that publish a "last updated" line. */
  dateModified?: string;
}): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    publisher: { "@id": organizationId },
    ...(dateModified ? { dateModified } : {}),
  };
}
