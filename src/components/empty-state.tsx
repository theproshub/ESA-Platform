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
    <div className="flex flex-col items-center rounded-lg border bg-card py-12 text-center sm:py-16">
      <Icon
        className="h-10 w-10 text-muted-foreground/40"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <p className="mt-4 text-base font-medium sm:text-lg">{title}</p>
      <p className="mt-1 text-[13px] text-muted-foreground sm:text-sm">
        {description}
      </p>
    </div>
  );
}
