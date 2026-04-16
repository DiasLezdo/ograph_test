export default function AnalyticsSlotDefault() {
  return (
    <p className="text-sm text-zinc-700">
      <code>@analytics/default.tsx</code> fallback. This appears on hard refresh at{" "}
      <code>/parallel-demo/settings</code> because <code>@analytics/settings</code> is not
      defined. It will also appear at <code>/parallel-demo/team-only</code>.
    </p>
  );
}
