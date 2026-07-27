import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { statusTone } from "@/lib/status";
import type { Announcement } from "@/lib/types";

const priorityStyles: Record<Announcement["priority"], string> = {
  urgent: statusTone.critical,
  high: statusTone.attention,
  medium: statusTone.info,
  low: statusTone.quiet,
};

export function PriorityBadge({
  priority,
  className,
}: {
  priority: Announcement["priority"];
  className?: string;
}) {
  return (
    <Badge className={cn("label", priorityStyles[priority], className)}>
      {priority}
    </Badge>
  );
}
