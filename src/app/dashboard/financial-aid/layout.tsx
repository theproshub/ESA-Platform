import type { Metadata } from "next";

// The page itself is a Client Component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Financial Aid",
};

export default function FinancialAidLayout({ children }: { children: React.ReactNode }) {
  return children;
}
