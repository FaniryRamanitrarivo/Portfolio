import { SITE_NAME } from "@/src/lib/shared/seo";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";
export const ogImageAlt = `${SITE_NAME} — Web Data Scraping & Full-Stack Developer`;

// Shared JSX for both the opengraph-image and twitter-image route
// conventions — each still needs its own file to get compiled into its
// own image-generating route, but the visual template stays in one place.
export function OgImageTemplate() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #1D4ED8 130%)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#60A5FA",
        }}
      >
        Faniry<span style={{ color: "#F8FAFC" }}>Ram.</span>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 40,
          fontSize: 68,
          fontWeight: 700,
          lineHeight: 1.15,
          color: "#F8FAFC",
          maxWidth: 900,
        }}
      >
        Web Data Scraping &amp; Full-Stack Developer
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 32,
          fontSize: 30,
          color: "#CBD5E1",
          maxWidth: 820,
        }}
      >
        Reliable data collection pipelines and production-grade web apps.
      </div>
    </div>
  );
}
