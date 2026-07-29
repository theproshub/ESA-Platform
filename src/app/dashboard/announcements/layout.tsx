import type { Metadata } from "next";

// The page itself is a Client Component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Announcements",
};

export default function AnnouncementsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
