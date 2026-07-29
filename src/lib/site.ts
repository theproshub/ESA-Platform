/**
 * One source of truth for the association's public identity. Consumed by the
 * Metadata API, the JSON-LD graph, the sitemap, and robots.txt so a change to
 * the name, email, or domain lands everywhere at once.
 */
import type { Metadata } from "next";

// Vercel injects VERCEL_PROJECT_PRODUCTION_URL (host only, no protocol) into
// every deployment, so previews still emit canonicals that point at
// production. Set NEXT_PUBLIC_SITE_URL once a custom domain is attached.
const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://esa-platform.vercel.app");

/** Canonical origin, never with a trailing slash. */
export const siteUrl = configuredUrl.replace(/\/+$/, "");

export const siteConfig = {
  name: "Economics Students Association",
  shortName: "ESA",
  university: "Stella Maris Polytechnic University",
  college: "Arthur Barclay Business College",
  department: "Department of Economics",
  /** "We learn not for school but for life." */
  motto: "Non Scholae Sed Vitae Discimus",
  email: "Econstudentsassn25@gmail.com",
  location: "Department of Economics, Main Campus",
  locality: "Monrovia",
  country: "LR",
  locale: "en_US",
  officeHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "16:00",
  },
  logo: {
    path: "/logo.png",
    width: 914,
    height: 1064,
  },
  description:
    "The official platform of the Economics Students Association at Stella Maris Polytechnic University, Arthur Barclay Business College. Access courses, schedules, financial aid, mentorship, and association resources.",
} as const;

/** Applied to every child segment's title; the root layout owns the default. */
export const titleTemplate = `%s — ${siteConfig.name}`;

export const defaultTitle = `${siteConfig.name} — ${siteConfig.university}`;

/** Resolves a route to its absolute URL, for JSON-LD and the sitemap. */
export function absoluteUrl(path = "/") {
  return path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`;
}

/**
 * The generated share card at app/opengraph-image.tsx. A segment that declares
 * its own `openGraph` replaces the parent's wholesale — including the image
 * Next attaches from the file convention — so pages restate it through here.
 */
export const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: defaultTitle,
};

/**
 * Metadata for a public page: title and description in the head, the Open
 * Graph and Twitter cards, and the canonical.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

/** Public, indexable routes. The dashboard is a members' area and stays out. */
export const publicRoutes = [
  "/",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
] as const;
