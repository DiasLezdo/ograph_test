export default async function AboutPage() {
  // Simulate a delay to trigger Suspense
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Template Demo: About Page</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        You are now on the <code>/temp-demo/about</code> page. Because you navigated here under a Template, the entire orange boundary was destroyed and rebuilt, and the suspense loader was shown again!
      </p>
    </div>
  );
}
