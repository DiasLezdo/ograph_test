import type { Metadata } from "next";
import Link from "next/link";

const FALLBACK_SITE_URL = "http://localhost:4000";

function safeSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return new URL(FALLBACK_SITE_URL);
  try {
    return new URL(raw);
  } catch {
    return new URL(FALLBACK_SITE_URL);
  }
}

const SITE_URL = safeSiteUrl();

function absUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

function encodeUmb(umb: string) {
  return encodeURIComponent(umb);
}

export async function generateMetadata({
  params,
}: {
  params: { umb: string } | Promise<{ umb: string }>;
}): Promise<Metadata> {
  const { umb } = await params;
  const encodedUmb = encodeUmb(umb);

  const title = `SEO: ${umb}`;
  const description = `Dynamic OpenGraph image + favicon for slug "${umb}".`;

  const pageUrl = absUrl(`/seo/${encodedUmb}`);
  const ogImageUrl = absUrl(`/seo/${encodedUmb}/opengraph-image`);
  const faviconUrl = absUrl(`/seo/${encodedUmb}/favicon.svg`);

  return {
    metadataBase: SITE_URL,
    title,
    description,
    icons: {
      icon: faviconUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      images: [ogImageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function UmbPage({
  params,
}: {
  params: { umb: string } | Promise<{ umb: string }>;
}) {
  const { umb } = await params;
  const encodedUmb = encodeUmb(umb);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold">SEO dynamic page</h1>
      <p className="mt-2 text-zinc-700 dark:text-zinc-300">
        Slug: <span className="font-semibold">{umb}</span>
      </p>

      <div className="mt-6 space-y-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div>
          <span className="font-semibold">Metadata title:</span> SEO: {umb}
        </div>
        <div>
          <span className="font-semibold">Favicon URL:</span>{" "}
          <span className="break-all">{`/seo/${encodedUmb}/favicon.svg`}</span>
        </div>
        <div>
          <span className="font-semibold">OG image URL:</span>{" "}
          <span className="break-all">{`/seo/${encodedUmb}/opengraph-image`}</span>
        </div>
      </div>

      <div className="mt-6">
        <Link className="underline" href="/seo">
          Back to /seo
        </Link>
      </div>
    </div>
  );
}

