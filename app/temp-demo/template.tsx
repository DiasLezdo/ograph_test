import { Suspense } from "react";

export default function TempDemoTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  // A template is recreated on EVERY navigation. 
  // We can add a simple random number logic to prove it re-renders.
  const renderId = Math.random().toString(36).substring(7);

  return (
    <div className="p-6 border-4 border-orange-500 border-dashed rounded-xl bg-orange-50 dark:bg-orange-950/20 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="text-orange-600 dark:text-orange-400 font-semibold mb-2 text-lg">
        🟧 Root Template (Re-renders on every navigation)
      </div>
      <div className="text-xs font-mono text-orange-500 mb-6">
        Render ID: {renderId} (Notice this changes on each click!)
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded p-4">
        <Suspense fallback={
          <div className="flex items-center gap-2 text-orange-600 p-4">
            <div className="w-4 h-4 rounded-full border-2 border-orange-600 border-t-transparent animate-spin"></div>
            <span>Suspense UI: Loading Page Content...</span>
          </div>
        }>
          {children}
        </Suspense>
      </div>
    </div>
  );
}
