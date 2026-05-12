import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          background: "#0a0908",
          color: "#f3ecde",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 36,
          fontWeight: 900,
          letterSpacing: "-0.08em",
          fontFamily: "sans-serif",
        }}
      >
        <span>C</span>
        <span style={{ color: "#a31e38" }}>.</span>
        <span>C</span>
      </div>
    ),
    { ...size },
  );
}
