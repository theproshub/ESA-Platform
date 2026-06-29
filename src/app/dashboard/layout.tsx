import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main id="main-content" className="md:ml-[256px]">
        <div className="mx-auto max-w-5xl px-6 py-8 pt-20 md:px-8 md:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
