/**
 * Semantic status tones, replacing the per-page Tailwind pastels the dashboard
 * used to reach for. Every status pill on the platform draws from this set, so
 * "approved", "active", and "completed" read the same wherever they appear.
 */
export const statusTone = {
  positive: "bg-positive/12 text-positive",
  attention: "bg-attention/12 text-attention",
  info: "bg-info/12 text-info",
  quiet: "bg-quiet/12 text-quiet",
  critical: "bg-critical/12 text-critical",
} as const;

export type StatusTone = keyof typeof statusTone;

/** Left border markers, for rows keyed by category rather than pilled. */
export const statusRule = {
  positive: "border-l-positive",
  attention: "border-l-attention",
  info: "border-l-info",
  quiet: "border-l-quiet",
  critical: "border-l-critical",
} as const;
