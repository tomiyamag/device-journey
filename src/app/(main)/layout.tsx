import { redirect } from "next/navigation";

import { getUser } from "@/actions/user";
import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

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
