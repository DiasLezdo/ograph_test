import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

function shortLabel(umb: string) {
  const alnum = umb.replace(/[^a-z0-9]/gi, "");
  const label = alnum.slice(0, 3).toUpperCase();
  return label.length ? label : "S";
}

function colorFromUmb(umb: string) {
  let hash = 0;
  for (let i = 0; i < umb.length; i++) {
    hash = (hash * 31 + umb.charCodeAt(i)) >>> 0;
  }
  const hue = hash % 360;
  const bg = `hsl(${hue}, 90%, 40%)`;
  const fg = `hsl(${(hue + 200) % 360}, 95%, 92%)`;
  return { bg, fg };
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ umb: string }> }
) {
  const { umb } = await context.params;
  const label = shortLabel(umb);
  const { bg, fg } = colorFromUmb(umb);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${bg}"/>
  <text x="32" y="40" text-anchor="middle" font-size="22" font-family="Arial, sans-serif" fill="${fg}" font-weight="900">${label}</text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
    },
  });
}

