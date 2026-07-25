import { User } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ComingSoon } from "@/components/coming-soon";

export default function ProfilePage() {
  return (
    <div className="space-y-5 sm:space-y-8">
      <PageHeader
        title="Profile"
        description="View and manage your student information."
      />
      <ComingSoon
        icon={User}
        title="Student Profile"
        description="Profile management is on the way. You'll soon be able to view and update your student details here."
      />
    </div>
  );
}
