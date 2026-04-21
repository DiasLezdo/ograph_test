import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm"
            href="/seo"
          >
            SEO
          </Link>
          <Link
            className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm"
            href="/blog"
          >
            Blog (MDX)
          </Link>
          <Link
            className="rounded-md border border-blue-300 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-800"
            href="/parallel-demo"
          >
            Parallel Demo
          </Link>
          <div className="flex flex-wrap gap-3 border-2 border-dashed border-green-500 p-4 m-4 rounded-xl">
            <h1 className="text-lg font-medium text-orange-500">Group route</h1>
            <Link
              className="rounded-md border border-purple-300 bg-purple-50 px-3 py-1.5 text-sm font-medium text-purple-800"
              href="/route-group/about"
            >
              Marketing About
            </Link>
            <Link
              className="rounded-md border border-cyan-300 bg-cyan-50 px-3 py-1.5 text-sm font-medium text-cyan-800"
              href="/route-group/career"
            >
              Development Career
            </Link>
          </div>
          <Link
            className="rounded-md border border-orange-300 bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-800 self-center"
            href="/temp-demo"
          >
            Template Demo (Suspense)
          </Link>
          <Link
            className="rounded-md border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-800 self-center"
            href="/draft-demo"
          >
            Draft Mode Demo
          </Link>
          <Link
            className="rounded-md border border-teal-300 bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-800 self-center"
            href="/learning/user-agent"
          >
            User Agent Inspector
          </Link>
        </div>
      </main>
    </div>
  );
}
