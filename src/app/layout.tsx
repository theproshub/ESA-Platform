import type { Metadata, Viewport } from "next";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import {
  defaultTitle,
  siteConfig,
  siteUrl,
  titleTemplate,
} from "@/lib/site";
import { siteGraph } from "@/lib/structured-data";
import "./globals.css";

// Newsreader carries the headings — a news serif, set heavy, for an
// association that publishes as much as it teaches.
const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const sans = IBM_Plex_Sans({
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Every figure on the platform — credit hours, course codes, dates, counts —
// is set in mono with tabular numerals so columns of them line up.
const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Relative URLs below (and in every child segment) resolve against this.
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: titleTemplate,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.shortName} Platform`,
  keywords: [
    "Economics Students Association",
    "ESA",
    "Stella Maris Polytechnic University",
    "Arthur Barclay Business College",
    "economics students",
    "student association",
    "Liberia",
    "course guide",
    "academic schedule",
    "student mentorship",
    "financial aid",
  ],
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "education",
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: defaultTitle,
    description: siteConfig.description,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Addresses and hours are set as prose, not tap targets.
  formatDetection: { telephone: false, address: false, email: false },
  appleWebApp: {
    capable: true,
    title: siteConfig.shortName,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${serif.variable} ${sans.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none"
        >
          Skip to main content
        </a>
        {/* The association and website nodes every page-level node points at. */}
        <JsonLd data={siteGraph} />
        {children}
      </body>
    </html>
  );
}
