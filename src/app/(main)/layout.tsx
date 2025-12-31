export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="bg-white h-24 sticky top-0 -left-5 z-10 w-full px-5 sm:px-16 flex items-center justify-between gap-8">
        <div className="flex gap-6 sm:gap-8 items-center">
          <div>三</div>
          <h1>
            おかえりなさい、
            <br />
            <strong>User Name</strong>
          </h1>
        </div>

        <div className="">
          <img
            src="https://placehold.jp/40x40.png"
            alt=""
            className="w-13 h-13 rounded-full overflow-hidden"
          />
        </div>

        <nav className="hidden"></nav>
      </header>

      <main className="px-5 sm:px-16 py-5 sm:py-10">{children}</main>

      <footer className="py-4 bg-white">
        <div className="text-center text-gray-600">
          <small>&copy; Copyright.</small>
        </div>
      </footer>
    </>
  );
}
