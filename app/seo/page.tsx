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

export async function generateMetadata(): Promise<Metadata> {
  const title = "SEO";
  const description =
    "SEO demo with dynamic metadata, OpenGraph images, and favicon per slug.";

  return {
    metadataBase: SITE_URL,
    title,
    description,
    icons: {
      icon: absUrl("/seo/favicon.svg"),
    },
    openGraph: {
      title,
      description,
      url: absUrl("/seo"),
      images: [
        {
          url: "/uuu.png",
          secureUrl: "/uuu.png",
          width: 1200,
          height: 630,
          alt: "blogoo preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absUrl("/uuu.png")],
    },
  };
}

export default function Page() {
  const examples = ["alpha", "beta", "learn-seo", "opengraph-demo"];

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold">SEO (static page)</h1>
      <p className="mt-2 text-zinc-700 dark:text-zinc-300">
        Open `SEO demo` slugs to see `generateMetadata`, OpenGraph image, and
        favicon change per `umb`.
      </p>

      <ul className="mt-6 space-y-2">
        {examples.map((umb) => (
          <li key={umb}>
            <Link className="underline" href={`/seo/${umb}`}>
              /seo/{umb}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
