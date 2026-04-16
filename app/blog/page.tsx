import Link from "next/link";

const posts = [
  { slug: "welcome", title: "Welcome Post" },
  { slug: "about", title: "About MDX Import" },
];

export default function BlogIndexPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold text-zinc-900">Dynamic MDX Blog</h1>
      <p className="mt-3 text-zinc-700">
        This list routes to pages rendered with dynamic MDX imports.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-6 text-zinc-800">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="text-blue-700 underline underline-offset-4">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

