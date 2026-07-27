export type LegalSection = { heading: string; body: string[] };

export function LegalSections({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="space-y-8 sm:space-y-10">
        {sections.map((section, i) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] sm:text-[28px]">
              <span className="figure text-muted-foreground">{i + 1}.</span>{" "}
              {section.heading}
            </h2>
            {section.body.map((paragraph, j) => (
              <p
                key={j}
                className="mt-3 text-[15px] leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
