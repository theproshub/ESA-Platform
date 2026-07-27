import type { ComponentType, SVGProps } from "react";
import { Star } from "@/components/star-mark";

export function ComingSoon({
  icon: Icon,
  title,
  description,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-card px-6 py-16 text-center ring-1 ring-border sm:py-24">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary sm:h-16 sm:w-16">
        <Icon
          className="h-7 w-7 text-brand sm:h-8 sm:w-8"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
      <span className="label mt-6 inline-flex items-center gap-1.5 text-accent">
        <Star className="h-2 w-2" />
        In development
      </span>
      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground sm:text-base">
        {description}
      </p>
    </div>
  );
}
