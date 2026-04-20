import { draftMode } from "next/headers";
import Link from "next/link";

export default async function DraftDemoPage() {
  // Check if draft mode is enabled
  const { isEnabled } = await draftMode();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6">
      <div className="max-w-xl w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
          Draft Mode Demo
        </h1>

        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Draft Mode allows you to bypass Next.js static rendering to preview
          unpublished content/documents directly from your CMS on your live site.
        </p>

        <div
          className={`p-6 rounded-lg mb-8 border-2 ${
            isEnabled
              ? "bg-green-50 border-green-500 dark:bg-green-950/20"
              : "bg-zinc-50 border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-lg text-zinc-800 dark:text-zinc-200">
              Current Status:
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-bold ${
                isEnabled
                  ? "bg-green-500 text-white"
                  : "bg-zinc-300 text-zinc-700 dark:bg-zinc-600 dark:text-zinc-300"
              }`}
            >
              {isEnabled ? "ENABLED 🟢" : "DISABLED ⚪"}
            </span>
          </div>

          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            {isEnabled
              ? "You are currently bypassing static caching! Data fetches here would now show live draft content."
              : "You are currently viewing the static, published version of the site."}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-center gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6 mb-6">
            <Link
              href="/api/draft/enable"
              // Best practice: Disable prefetch so we don't accidentally toggle the route cookie 
              // just by hovering / rendering the link.
              prefetch={false}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                isEnabled
                  ? "bg-zinc-200 text-zinc-500 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-600"
                  : "bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              }`}
            >
              Enable Draft Mode
            </Link>

            <Link
              href="/api/draft/disable"
              prefetch={false}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                !isEnabled
                  ? "bg-zinc-200 text-zinc-500 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-600"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              Disable Draft Mode
            </Link>
          </div>

          <Link
            href="/"
            className="text-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            &larr; Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
