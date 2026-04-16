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
          <Link className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm" href="/seo">
            SEO
          </Link>
          <Link className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm" href="/blog">
            Blog (MDX)
          </Link>
          <Link
            className="rounded-md border border-blue-300 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-800"
            href="/parallel-demo"
          >
            Parallel Demo
          </Link>
        </div>
      </main>
    </div>
  );
}
