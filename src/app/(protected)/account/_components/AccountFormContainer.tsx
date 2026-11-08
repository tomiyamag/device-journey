import { getUser } from "@/lib/queries/user";
import { getUserProfile } from "@/lib/queries/userProfile";

import AccountForm from "./AccountForm";
import ConfirmedMailAddressMessage from "./ConfirmedMailAddressMessage";

interface IAccountFormContainer {
  searchParams: Promise<{
    successMessage?: string;
    errorMessage?: string;
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
  const pendingEmail = user.new_email ?? undefined;
  const { successMessage, errorMessage } = await searchParams;

  return (
    <>
      <ConfirmedMailAddressMessage
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <AccountForm
        profile={profile}
        email={email}
        pendingEmail={pendingEmail}
      />
    </>
  );
};

export default AccountFormContainer;
