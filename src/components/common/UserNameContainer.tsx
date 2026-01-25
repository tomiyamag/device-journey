import { getUserProfile } from "@/lib/queries/userProfile";

import { UserName } from "./UserName";

const UserNameContainer = async () => {
  const data = await getUserProfile();
  return <UserName data={data} />;
};

export default UserNameContainer;
