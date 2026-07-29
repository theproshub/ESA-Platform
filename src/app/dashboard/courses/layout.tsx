import type { Metadata } from "next";

// The page itself is a Client Component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Course Guide",
};

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
