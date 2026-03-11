import { getUser } from "@/lib/queries/user";
import { getUserProfile } from "@/lib/queries/userProfile";

import { Avatar, IAvatar } from "./Avatar";

type AvatarContainerProps = Omit<IAvatar, "userProfile">;

export const AvatarContainer = async ({
  size = "full",
  preview,
}: AvatarContainerProps) => {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const userProfile = await getUserProfile(user.id);

  return <Avatar userProfile={userProfile} size={size} preview={preview} />;
};
