export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>Header</header>
      {children}
      <footer>Footer</footer>
    </>
  );
}
