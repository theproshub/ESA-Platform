import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: ReactNode;
}) {
  return (
    <header>
      <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
      <p className="mt-1.5 text-sm text-muted-foreground sm:mt-2 sm:text-base">
        {description}
      </p>
    </header>
  );
}
