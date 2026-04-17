export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Simulate network delay to trigger suspense
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Blog Post: {slug}</h1>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
        This is a dynamic route. Because you navigated here, the templates above
        were force-remounted.
      </p>
    </div>
  );
}
