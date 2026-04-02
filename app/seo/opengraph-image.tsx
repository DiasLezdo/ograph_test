import { ImageResponse } from "next/og";

export const runtime = "edge";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #111827, #4f46e5)",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
        }}
      >
        <div
          style={{
            width: 980,
            maxWidth: "90%",
            padding: "72px 64px",
            borderRadius: 48,
            background: "rgba(255,255,255,0.92)",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 20,
          }}
        >
          <div style={{ fontSize: 56, fontWeight: 800, color: "#111827" }}>
            SEO demo
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, color: "#374151" }}>
            Dynamic OpenGraph image route
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

