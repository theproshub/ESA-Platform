import type { ComponentType, SVGProps } from "react";

export function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-card py-12 text-center ring-1 ring-border sm:py-16">
      <Icon
        className="h-9 w-9 text-muted-foreground/35"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <p className="mt-4 font-serif text-lg font-semibold tracking-[-0.015em] sm:text-xl">
        {title}
      </p>
      <p className="mt-1.5 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
