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
  const title = "SEO Static Page";
  const description = "SEO sttskjvnsfjvsfni n kisjdnvisdj.";

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
      url: absUrl("/seo/oomn"),
      images: [
        {
          url: "https://res.cloudinary.com/dz4augbi8/image/upload/q_auto/f_auto/v1739447626/next-beloogo/r5bekcjmib7amcguul53.jpg",
          secureUrl:
            "https://res.cloudinary.com/dz4augbi8/image/upload/q_auto/f_auto/v1739447626/next-beloogo/r5bekcjmib7amcguul53.jpg",
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
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold">Ooom Test</h1>
      <p className="mt-2 text-zinc-700 dark:text-zinc-300">
        ommm value static page
      </p>

      <h1>OOOmbn</h1>
    </div>
  );
}
