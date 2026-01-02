import { getUserProfile } from "@/actions/profile";
import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getUserProfile();

  return (
    <>
      <Header profile={profile} />
      <main className="px-5 sm:px-16 py-5 sm:py-10">{children}</main>
      <Footer />
    </>
  );
}
