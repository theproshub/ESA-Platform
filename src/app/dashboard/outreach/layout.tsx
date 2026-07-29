import type { Metadata } from "next";

// The page itself is a Client Component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Community Outreach",
};

export default function OutreachLayout({ children }: { children: React.ReactNode }) {
  return children;
}
