import Link from "next/link";

export default function TempDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 m-4 border-4 border-blue-500 rounded-xl bg-blue-50 dark:bg-zinc-900 mx-auto max-w-4xl">
      <div className="text-blue-600 dark:text-blue-400 font-semibold mb-4 text-xl flex justify-between items-center">
        <span>🟦 Layout (Preserves State)</span>
        <Link href="/" className="text-sm underline">Back to Home</Link>
      </div>
      
      <div className="flex gap-4 mb-6 pb-4 border-b border-blue-200 dark:border-blue-800">
        <Link href="/temp-demo" className="text-blue-700 dark:text-blue-300 hover:underline">/temp-demo (Root)</Link>
        <Link href="/temp-demo/about" className="text-blue-700 dark:text-blue-300 hover:underline">/temp-demo/about</Link>
        <Link href="/temp-demo/blog" className="text-blue-700 dark:text-blue-300 hover:underline">/temp-demo/blog</Link>
      </div>
      
      <p className="text-sm text-zinc-500 mb-6">
        The blue border area is the <strong>Layout</strong>. It does not re-render when you navigate between the links above.
      </p>

      {children}
    </div>
  );
}
