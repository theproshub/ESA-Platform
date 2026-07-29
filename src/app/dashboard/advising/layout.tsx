import type { Metadata } from "next";

// The page itself is a Client Component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Academic Advising",
};

export default function AdvisingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
