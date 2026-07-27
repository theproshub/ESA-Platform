import { Sidebar } from "@/components/sidebar";
import { PageTransition } from "@/components/page-transition";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      {/* pt-14 clears the sidebar's fixed mobile bar so the site header can sit
          in the flow beneath it; on md the sidebar is a static column instead. */}
      <div className="flex min-h-screen flex-col pt-14 md:ml-[256px] md:pt-0">
        <SiteHeader showDashboardCta={false} showOnMobile={false} />
        <main id="main-content" className="flex-1">
          <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 md:px-8">
            <PageTransition>{children}</PageTransition>
          </div>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
