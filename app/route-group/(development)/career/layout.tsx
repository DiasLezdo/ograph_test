export default function DevelopmentCareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 m-4 border-2 border-blue-500 rounded-xl bg-blue-50 dark:bg-blue-950/20">
      <div className="text-blue-600 font-semibold mb-4">
        🔵 Development Layout: app/route-group/(development)/career/layout.tsx
      </div>
      <div>{children}</div>
    </div>
  );
}
