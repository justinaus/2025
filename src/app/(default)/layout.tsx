import { Footer } from '@/components/layout/footer';

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-linear-to-r from-cyan-500 to-blue-500">
        Header
      </header>
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
