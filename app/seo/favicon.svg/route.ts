import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#4f46e5"/>
  <text x="32" y="40" text-anchor="middle" font-size="22" font-family="Arial, sans-serif" fill="#ffffff" font-weight="800">SEO</text>
</svg>`;

  return new NextResponse(svg, {
    headers: { "Content-Type": "image/svg+xml; charset=utf-8" },
  });
}

