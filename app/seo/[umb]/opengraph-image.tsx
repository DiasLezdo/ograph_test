import { ImageResponse } from "next/og";

export const runtime = "edge";

function shortLabel(umb: string) {
  const alnum = umb.replace(/[^a-z0-9]/gi, "");
  const label = alnum.slice(0, 6).toUpperCase();
  return label.length ? label : "SEO";
}

function colorFromUmb(umb: string) {
  let hash = 0;
  for (let i = 0; i < umb.length; i++) {
    hash = (hash * 31 + umb.charCodeAt(i)) >>> 0;
  }
  const hue = hash % 360;
  return {
    bg: `hsl(${hue}, 85%, 35%)`,
    bg2: `hsl(${(hue + 50) % 360}, 85%, 45%)`,
    fg: "#ffffff",
  };
}

export default function OpenGraphImage({
  params,
}: {
  params: { umb: string };
}) {
  const umb = params.umb ?? "";
  const { bg, bg2, fg } = colorFromUmb(umb);
  const label = shortLabel(umb);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${bg}, ${bg2})`,
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
            gap: 18,
          }}
        >
          <div style={{ fontSize: 46, fontWeight: 850, color: "#111827" }}>
            OpenGraph
          </div>
          <div
            style={{
              fontSize: 70,
              fontWeight: 900,
              lineHeight: 1,
              color: "#0f172a",
              letterSpacing: "-0.02em",
            }}
          >
            {label}
          </div>
          <div style={{ fontSize: 30, fontWeight: 650, color: "#374151" }}>
            {`/seo/${umb}`}
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: "#4b5563" }}>
            {`favicon: /seo/${umb}/favicon.svg`}
          </div>
          <div
            style={{
              marginTop: 10,
              fontSize: 18,
              fontWeight: 650,
              color: fg,
            }}
          >
            Dynamic OG image per slug
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

