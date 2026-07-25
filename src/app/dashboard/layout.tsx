import { Sidebar } from "@/components/sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
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
        <DashboardHeader />
        <main id="main-content" className="flex-1">
          <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 md:px-8 md:pt-8">
            {children}
          </div>
        </main>
        <SiteFooter className="mt-8 pb-24 md:mt-12 md:pb-0" />
      </div>
    </div>
  );
}
