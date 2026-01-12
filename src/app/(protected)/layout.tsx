import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Header /> */}
      <main className="px-4 sm:px-16 py-5 sm:py-10 overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
}
