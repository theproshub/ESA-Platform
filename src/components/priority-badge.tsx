import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Announcement } from "@/lib/types";

const priorityStyles: Record<Announcement["priority"], string> = {
  urgent: "bg-red-100 text-red-800",
  high: "bg-amber-100 text-amber-800",
  medium: "bg-blue-100 text-blue-800",
  low: "bg-stone-100 text-stone-700",
};

export function PriorityBadge({
  priority,
  className,
}: {
  priority: Announcement["priority"];
  className?: string;
}) {
  return (
    <Badge
      className={cn("text-[11px] sm:text-xs", priorityStyles[priority], className)}
    >
      {priority}
    </Badge>
  );
}
