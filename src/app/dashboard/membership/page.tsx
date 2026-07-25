import { CreditCard } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ComingSoon } from "@/components/coming-soon";

export default function MembershipPage() {
  return (
    <div className="space-y-5 sm:space-y-8">
      <PageHeader
        title="Membership Card"
        description="Your verified digital ESA membership identification."
      />
      <ComingSoon
        icon={CreditCard}
        title="Digital Membership Card"
        description="Your verified ESA membership card will be available here soon."
      />
    </div>
  );
}
