import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:4000";

function absUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "SEO";
  const description =
    "SEO demo with dynamic metadata, OpenGraph images, and favicon per slug.";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    icons: {
      icon: absUrl("/seo/favicon.svg"),
    },
    openGraph: {
      title,
      description,
      url: absUrl("/seo"),
      images: [absUrl("/seo/opengraph-image")],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absUrl("/seo/opengraph-image")],
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
