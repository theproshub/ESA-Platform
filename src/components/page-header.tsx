import type { ReactNode } from "react";
import { Star } from "@/components/star-mark";

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: ReactNode;
}) {
  return (
    <header>
      <div className="flex items-center gap-3">
        <Star className="text-accent" />
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>
      <h1 className="mt-4 text-[26px] font-semibold tracking-[-0.02em] sm:text-[32px]">
        {title}
      </h1>
      <p className="mt-2 text-[15px] text-muted-foreground sm:text-base">
        {description}
      </p>
    </header>
  );
}
