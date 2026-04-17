import Link from "next/link";

export default function MarketingAboutPage() {
  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow border border-zinc-200 dark:border-zinc-800">
      <h1 className="text-2xl font-bold mb-4">Marketing - About Us</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-4">
        This is the about page inside the <code className="font-semibold bg-zinc-100 dark:bg-zinc-800 px-1 rounded">(marketing)</code> route group.
      </p>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        Path: <code>app/route-group/(marketing)/about/page.tsx</code><br/>
        URL: <code>/route-group/about</code>
      </p>
      <Link href="/" className="text-purple-600 hover:underline">
        &larr; Back Home
      </Link>
    </div>
  );
}
