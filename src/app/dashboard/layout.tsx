import { Sidebar } from "@/components/sidebar";
import { PageTransition } from "@/components/page-transition";
import { SiteFooter } from "@/components/site-footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="flex min-h-screen flex-col md:ml-[256px]">
        <main id="main-content" className="flex-1">
          <div className="mx-auto max-w-5xl px-4 py-6 pt-18 sm:px-6 sm:py-8 md:px-8 md:pt-8">
            <PageTransition>{children}</PageTransition>
          </div>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
