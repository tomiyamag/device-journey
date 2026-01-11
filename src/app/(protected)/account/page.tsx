import { getUser } from "@/actions/user";
import PageHeading from "@/components/atoms/PageHeading";
import BackHome from "@/components/molecules/BackHome";
import AccountFormContainer from "@/components/organisms/AccountFormContainer";

interface IAccountPage {
  searchParams: Promise<{
    message: string;
  }>;
}

export default async function AccountPage({ searchParams }: IAccountPage) {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const email = user?.email ?? "";

  return (
    <section>
      <PageHeading label="アカウント設定" />
      <AccountFormContainer
        email={email}
        confirmSuccessMessage={(await searchParams).message}
      />
      <BackHome />
    </section>
  );
}
