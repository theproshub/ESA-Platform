import { cn } from "@/lib/utils";

/**
 * The IS–LM diagram at the centre of the association crest, redrawn as a wide
 * hairline figure. The curves trace themselves in on load and the Lone Star
 * settles on the equilibrium point where they cross.
 *
 * Decorative: the hero states its case in text, this restates it in the
 * subject's own notation.
 */
export function IsLmPlot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 200"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("h-auto w-full", className)}
    >
      {/* Axes: interest rate against income, as the crest sets them. */}
      <g stroke="currentColor" strokeWidth="1.25" opacity="0.6">
        <path d="M60 20V165H760" strokeLinecap="square" />
      </g>

      {/* Projection guides down to each axis, echoing the crest's dotted marks. */}
      <g
        stroke="currentColor"
        strokeWidth="1.25"
        strokeDasharray="3 5"
        opacity="0.5"
      >
        <path d="M60 134H396" />
        <path d="M396 134V165" />
      </g>

      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path
          d="M90 40C260 130 420 148 740 152"
          pathLength={1}
          className="animate-trace"
        />
        <path
          d="M90 158C340 156 500 130 700 35"
          pathLength={1}
          className="animate-trace"
          style={{ animationDelay: "0.2s" }}
        />
      </g>

      <g
        fill="currentColor"
        opacity="0.9"
        fontSize="15"
        fontFamily="var(--font-mono), ui-monospace, monospace"
      >
        <text x="710" y="40">LM</text>
        <text x="748" y="146">IS</text>
        <text x="42" y="28">i</text>
        <text x="770" y="182">Y</text>
      </g>

      {/* Equilibrium. */}
      <g className="animate-star-settle text-accent">
        <path
          d="M396 125 398.02 131.22 404.56 131.22 399.27 135.06 401.29 141.28 396 137.44 390.71 141.28 392.73 135.06 387.44 131.22 393.98 131.22Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
