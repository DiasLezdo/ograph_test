export default function ParallelDemoDefaultPage() {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-zinc-900">children default.tsx</h3>
      <p className="text-sm text-zinc-700">
        Fallback for the implicit <code>children</code> slot when state cannot be recovered.
      </p>
      <p className="text-sm text-zinc-700">
        Try: open <code>/parallel-demo/team-only</code> and hard refresh the page.
      </p>
    </div>
  );
}
