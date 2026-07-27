import { Sidebar } from "@/components/sidebar";
import { DashboardNavProvider } from "@/components/dashboard-nav";
import { PageTransition } from "@/components/page-transition";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardNavProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="flex min-h-screen flex-col md:ml-[256px]">
          {/* One bar on mobile: the site header carries the sidebar toggle, and
              the drawer it opens is the single mobile menu. */}
          <SiteHeader showDashboardCta={false} showMobileMenu={false} />
          <main id="main-content" className="flex-1">
            <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 md:px-8">
              <PageTransition>{children}</PageTransition>
            </div>
          </main>
          <SiteFooter />
        </div>
      </div>
    </DashboardNavProvider>
  );
}
