import type { MetadataRoute } from "next";
import { absoluteUrl, publicRoutes } from "@/lib/site";

const priorities: Record<string, number> = {
  "/": 1,
  "/about": 0.8,
  "/contact": 0.8,
  "/privacy": 0.3,
  "/terms": 0.3,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: priorities[route] ?? 0.5,
  }));
}
