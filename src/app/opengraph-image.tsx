import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Clickiclick.studio — Custom-made digital works";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(ellipse at top left, #1a1410 0%, #0a0908 50%, #050403 100%)",
          color: "#f3ecde",
          display: "flex",
          flexDirection: "column",
          padding: "72px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Top meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#9a8d77",
          }}
        >
          <span>Studio · Anno MMXXVI</span>
          <span>Barcelona · Catalunya</span>
        </div>

        {/* Centre wordmark */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              fontSize: 168,
              fontWeight: 900,
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <span>CLICK</span>
            <span style={{ color: "#ff5b3c" }}>.</span>
            <span>ICLICK</span>
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 42,
              fontStyle: "italic",
              color: "#ff5b3c",
              letterSpacing: "-0.02em",
            }}
          >
            studio.
          </div>
        </div>

        {/* Bottom line */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: 32,
            borderTop: "1px solid rgba(243,236,222,0.18)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontSize: 24,
            letterSpacing: "-0.01em",
          }}
        >
          <span>Custom-made digital works</span>
          <span style={{ color: "#9a8d77", fontSize: 18 }}>
            clickiclick.studio
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
