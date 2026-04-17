import { Suspense } from "react";
import Link from "next/link";

export default function BlogTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const renderId = Math.random().toString(36).substring(7);

  return (
    <div className="p-4 border-2 border-red-500 border-dashed rounded-lg bg-red-50 dark:bg-red-950/20 mt-4">
      <div className="text-red-600 dark:text-red-400 font-semibold mb-2 flex justify-between items-center">
        <span>🟥 Nested Blog Template</span>
        <span className="text-xs font-mono bg-red-100 dark:bg-red-900 px-2 py-1 rounded">ID: {renderId}</span>
      </div>
      
      <div className="flex gap-2 mb-4 text-sm">
        <Link href="/temp-demo/blog/post-1" className="bg-white dark:bg-zinc-800 px-3 py-1 rounded shadow-sm hover:ring ring-red-300">
          Post 1
        </Link>
        <Link href="/temp-demo/blog/post-2" className="bg-white dark:bg-zinc-800 px-3 py-1 rounded shadow-sm hover:ring ring-red-300">
          Post 2
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-4 rounded">
        <Suspense fallback={<div className="animate-pulse text-red-500">Loading blog content...</div>}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}
