import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="px-4 sm:px-16 py-5 sm:py-10 overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
}
