import Link from "next/link";
import type { ReactNode } from "react";

type ParallelDemoLayoutProps = {
  children: ReactNode;
  team: ReactNode;
  analytics: ReactNode;
};

export default function ParallelDemoLayout({
  children,
  team,
  analytics,
}: ParallelDemoLayoutProps) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-zinc-900">Parallel Routes Demo</h1>
        <p className="max-w-3xl text-sm leading-6 text-zinc-700">
          `@team` and `@analytics` are rendered in the same layout. Use each section&apos;s own
          links to navigate and watch the other section keep its active state on soft navigation.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/parallel-demo" className="text-blue-700 underline underline-offset-4">
            Reset to /parallel-demo
          </Link>
          <Link
            href="/parallel-demo/settings"
            className="text-blue-700 underline underline-offset-4"
          >
            Example unmatched route: /parallel-demo/settings
          </Link>
          <Link
            href="/parallel-demo/team-only"
            className="text-blue-700 underline underline-offset-4"
          >
            Trigger children default: /parallel-demo/team-only
          </Link>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-zinc-200 bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            children slot
          </h2>
          {children}
        </article>
        <article className="rounded-lg border border-zinc-200 bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            @team slot
          </h2>
          {team}
        </article>
        <article className="rounded-lg border border-zinc-200 bg-white p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            @analytics slot
          </h2>
          {analytics}
        </article>
      </section>
    </main>
  );
}
