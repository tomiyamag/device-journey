// import AccountForm from "@/components/organisms/AccountForm";
import { getUser } from "@/lib/queries/user";
import { getUserProfile } from "@/lib/queries/userProfile";

import AccountForm from "./AccountForm";
import ConfirmedMailAddressMessage from "./ConfirmedMailAddressMessage";

interface IAccountFormContainer {
  confirmSuccessMessage?: string;
}

const AccountFormContainer = async ({
  confirmSuccessMessage,
}: IAccountFormContainer) => {
  const profile = await getUserProfile();
  const user = await getUser();

  if (!user) {
    return null;
  }

  const email = user.email ?? "";

  return (
    <>
      <ConfirmedMailAddressMessage message={confirmSuccessMessage} />
      <AccountForm profile={profile} email={email} />
    </>
  );
};

export default AccountFormContainer;
