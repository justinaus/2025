export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-amber-300">Header</header>
      <div className="flex-1">{children}</div>
      <footer className="bg-blue-300">Footer</footer>
    </div>
  );
}
