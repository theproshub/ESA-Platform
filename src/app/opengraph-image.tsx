import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.university}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The share card carries the same brand navy, crest, and accent rule as the
// site header. Colours are literals because ImageResponse resolves no CSS
// variables. Keep in sync with the --brand tokens in globals.css.
const BRAND = "#072a5e";
const BRAND_FOREGROUND = "#f2efe8";
const ACCENT = "#c1121f";

export default async function Image() {
  const crest = await readFile(join(process.cwd(), "public", "logo.png"));
  const crestSrc = `data:image/png;base64,${crest.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BRAND,
          padding: "72px 80px",
          color: BRAND_FOREGROUND,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <img src={crestSrc} alt="" height={132} width={113} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(242,239,232,0.62)",
            }}
          >
            <span>{siteConfig.university}</span>
            <span>{siteConfig.college}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 96, height: 5, background: ACCENT }} />
          <div
            style={{
              marginTop: 32,
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 30,
              lineHeight: 1.4,
              color: "rgba(242,239,232,0.7)",
              maxWidth: 780,
            }}
          >
            Courses, schedules, announcements, and association resources — all
            in one place.
          </div>
        </div>
      </div>
    ),
    size
  );
}
