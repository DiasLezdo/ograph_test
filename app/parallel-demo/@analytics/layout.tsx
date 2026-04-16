import Link from "next/link";
import type { ReactNode } from "react";

type AnalyticsSlotLayoutProps = {
  children: ReactNode;
};

export default function AnalyticsSlotLayout({ children }: AnalyticsSlotLayoutProps) {
  return (
    <div className="space-y-3">
      <nav className="flex flex-wrap gap-2 text-xs">
        <Link className="rounded border border-zinc-300 px-2 py-1" href="/parallel-demo">
          Analytics: overview
        </Link>
        <Link className="rounded border border-zinc-300 px-2 py-1" href="/parallel-demo/views">
          Analytics: views
        </Link>
        <Link className="rounded border border-zinc-300 px-2 py-1" href="/parallel-demo/visitors">
          Analytics: visitors
        </Link>
      </nav>
      {children}
    </div>
  );
}

