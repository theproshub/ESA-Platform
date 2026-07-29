import type { JsonLdNode } from "@/lib/structured-data";

/**
 * Renders a schema.org payload as a native script tag — JSON-LD is data, not
 * executable code, so next/script is the wrong tool. `<` is escaped so a stray
 * HTML tag inside the data can't close the element early.
 */
export function JsonLd({ data }: { data: JsonLdNode | JsonLdNode[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
