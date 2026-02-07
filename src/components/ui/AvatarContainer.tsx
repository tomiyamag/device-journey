import { getUserProfile } from "@/lib/queries/userProfile";

import { Avatar, IAvatar } from "./Avatar";

type AvatarContainerProps = Omit<IAvatar, "userProfile">;

export const AvatarContainer = async ({
  size = "full",
  preview,
}: AvatarContainerProps) => {
  const userProfile = await getUserProfile();
  return <Avatar userProfile={userProfile} size={size} preview={preview} />;
};
