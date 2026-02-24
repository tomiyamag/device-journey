import { getUser } from "@/lib/queries/user";
import { getUserProfile } from "@/lib/queries/userProfile";

import AccountForm from "./AccountForm";
import ConfirmedMailAddressMessage from "./ConfirmedMailAddressMessage";

interface IAccountFormContainer {
  searchParams: Promise<{
    message: string;
  }>;
}

const AccountFormContainer = async ({
  searchParams,
}: IAccountFormContainer) => {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const profile = await getUserProfile(user.id);
  const email = user.email ?? "";

  return (
    <>
      <ConfirmedMailAddressMessage message={(await searchParams).message} />
      <AccountForm profile={profile} email={email} />
    </>
  );
};

export default AccountFormContainer;
