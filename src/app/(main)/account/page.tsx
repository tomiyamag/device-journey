import { getUser } from "@/actions/user";
import PageHeading from "@/components/atoms/PageHeading";
import BackHome from "@/components/molecules/BackHome";
import AccountFormContainer from "@/components/organisms/AccountFormContainer";

export default async function AccountPage() {
  const user = await getUser();

  console.log(user);

  return (
    <section>
      <PageHeading label="ユーザー設定" />
      <AccountFormContainer />
      <BackHome />
    </section>
  );
}
