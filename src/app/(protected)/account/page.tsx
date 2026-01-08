import { getUser } from "@/actions/user";
import PageHeading from "@/components/atoms/PageHeading";
import BackHome from "@/components/molecules/BackHome";
import AccountFormContainer from "@/components/organisms/AccountFormContainer";

export default async function AccountPage() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const email = user?.email ?? "";

  return (
    <section>
      <PageHeading label="アカウント設定" />
      <AccountFormContainer email={email} />
      <BackHome />
    </section>
  );
}
