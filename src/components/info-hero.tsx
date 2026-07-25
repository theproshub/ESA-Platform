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
    <div className="border-b bg-secondary/40">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-[13px] font-semibold uppercase tracking-wide text-accent">
          {eyebrow}
        </p>
        <h1 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        )}
        {updated && (
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: {updated}
          </p>
        )}
      </div>
    </div>
  );
}
