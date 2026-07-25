import type { ComponentType, SVGProps } from "react";

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
    <div className="flex flex-col items-center rounded-xl border bg-card px-6 py-16 text-center sm:py-24">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary sm:h-16 sm:w-16">
        <Icon
          className="h-7 w-7 text-accent sm:h-8 sm:w-8"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
      <span className="mt-5 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-accent">
        Coming Soon
      </span>
      <h2 className="mt-4 font-serif text-xl font-bold sm:text-2xl">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
        {description}
      </p>
    </div>
  );
}
