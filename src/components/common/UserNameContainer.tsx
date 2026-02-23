import { getSessionUser } from "@/lib/queries/user";
import { getUserProfile } from "@/lib/queries/userProfile";

import { UserName } from "./UserName";

const UserNameContainer = async () => {
  const user = await getSessionUser();

  if (!user) {
    return null;
  }

  const data = await getUserProfile(user.id);

  return <UserName data={data} />;
};

export default UserNameContainer;
