export default function MarketingAboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 m-4 border-2 border-purple-500 rounded-xl bg-purple-50 dark:bg-purple-950/20">
      <div className="text-purple-600 font-semibold mb-4">
        🟣 Marketing Layout: app/route-group/(marketing)/about/layout.tsx
      </div>
      <div>{children}</div>
    </div>
  );
}
