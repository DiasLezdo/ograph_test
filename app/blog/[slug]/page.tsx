import Link from "next/link";
import { notFound } from "next/navigation";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

const slugs = ["welcome", "about"] as const;

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;

  if (!slugs.includes(slug as (typeof slugs)[number])) {
    notFound();
  }

  const { default: Post } = await import(`@/content/${slug}.mdx`);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8 text-sm">
        <Link href="/blog" className="text-blue-700 underline underline-offset-4">
          Back to blog list
        </Link>
      </div>
      <Post />
    </main>
  );
}

