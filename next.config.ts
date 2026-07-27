import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this repo. A stray pnpm-lock.yaml in the home
  // directory otherwise makes Turbopack infer /Users/<user> as the root.
  // Note: next.config.ts is compiled before it runs, so import.meta.url points
  // at the compiled file rather than the repo — process.cwd() is the reliable
  // value here.
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Next 16 requires an explicit allowlist; the default is [75]. The crest is
    // requested at 90 in the header/footer and 100 in the hero.
    qualities: [75, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
