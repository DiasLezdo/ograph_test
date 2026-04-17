export default async function TempDemoPage() {
  // Simulate a slow database query or API call to trigger the Suspense fallback
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Template Demo: Home Page</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Notice that when you first loaded this page, or clicked "Root", the orange Template boundary triggered its Suspense fallback while waiting for this 1.5-second artificial delay to finish.
      </p>
    </div>
  );
}
