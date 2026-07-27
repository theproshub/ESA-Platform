import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The five-point star that flanks the association crest, reduced to a flat
 * geometric mark. It is the one hot element in the palette — used as a section
 * marker, the active nav indicator, and the equilibrium point in the hero plot.
 */
export function Star({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("h-2.5 w-2.5 shrink-0", className)}
    >
      <path d="M12 2 14.35 8.76 21.51 8.91 15.8 13.24 17.88 20.09 12 16 6.12 20.09 8.2 13.24 2.49 8.91 9.65 8.76Z" />
    </svg>
  );
}

/**
 * Section eyebrow: a hairline rule interrupted by the star, with a monospaced
 * label. `tone="brand"` is for the deep navy bands, where the rule dims and the
 * star keeps full strength.
 */
export function SectionMark({
  children,
  align = "center",
  tone = "default",
  className,
}: {
  children: ReactNode;
  align?: "center" | "start";
  tone?: "default" | "brand";
  className?: string;
}) {
  const rule = tone === "brand" ? "bg-brand-rule" : "bg-border";
  const text =
    tone === "brand" ? "text-brand-foreground/55" : "text-muted-foreground";

  if (align === "start") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <Star className="text-accent" />
        <p className={cn("label", text)}>{children}</p>
        <span aria-hidden="true" className={cn("h-px flex-1", rule)} />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <div className="flex w-full max-w-[200px] items-center gap-3">
        <span aria-hidden="true" className={cn("h-px flex-1", rule)} />
        <Star className="text-accent" />
        <span aria-hidden="true" className={cn("h-px flex-1", rule)} />
      </div>
      <p className={cn("label text-center", text)}>{children}</p>
    </div>
  );
}
