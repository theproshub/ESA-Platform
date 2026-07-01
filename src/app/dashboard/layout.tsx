import { Sidebar } from "@/components/sidebar";
import { PageTransition } from "@/components/page-transition";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main id="main-content" className="md:ml-[256px]">
        <div className="mx-auto max-w-5xl px-4 py-6 pt-18 sm:px-6 sm:py-8 md:px-8 md:pt-8">
          <PageTransition>{children}</PageTransition>
        </div>
      </main>
    </div>
  );
}
