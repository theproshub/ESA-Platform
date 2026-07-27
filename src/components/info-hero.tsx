import { SectionMark } from "@/components/star-mark";

export function InfoHero({
  eyebrow,
  title,
  description,
  updated,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  updated?: string;
}) {
  return (
    <div className="border-b bg-secondary/50">
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionMark align="start">{eyebrow}</SectionMark>
        <h1 className="mt-5 text-[32px] font-semibold tracking-[-0.025em] sm:text-[44px]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        )}
        {updated && (
          <p className="label mt-6 text-muted-foreground">
            Last updated {updated}
          </p>
        )}
      </div>
    </div>
  );
}
