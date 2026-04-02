export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col">
      <div>
        <h1>SEO</h1>
      </div>
      {children}
    </div>
  );
}
