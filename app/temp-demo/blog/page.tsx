export default async function BlogPage() {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Blog Index</h1>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
        Click on the post links above. Notice that clicking a post triggers BOTH
        the root template suspense loader and this nested template suspense
        loader, as both templates are destroyed and recreated simultaneously
        based on the route change.
      </p>
    </div>
  );
}
