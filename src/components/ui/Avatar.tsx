import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

import { getUserProfile } from "@/lib/queries/userProfile";
import { cn } from "@/lib/utils/cn";
import { getAvatarUrl } from "@/lib/utils/getAvatarUrl";
import { UserProfile } from "@/types";

import Skeleton from "./Skeleton";

interface IAvatarContainer {
  size?: "full" | "small";
  preview?: string | null;
}

export const AvatarContainer = async ({
  size = "full",
  preview,
}: IAvatarContainer) => {
  const userProfile = await getUserProfile();
  return <Avatar userProfile={userProfile} size={size} preview={preview} />;
};

interface IAvatar extends IAvatarContainer {
  userProfile: UserProfile;
}

export const Avatar = ({ userProfile, size = "full", preview }: IAvatar) => {
  const url = getAvatarUrl(userProfile.avatar_url);
  const imageSrc = preview || url;

  return (
    <div
      className={cn(
        "relative bg-white rounded-full overflow-hidden mx-auto border border-gray-200",
        {
          "w-40 sm:w-50 h-40 sm:h-50": size === "full",
          "w-10 sm:w-11.5 h-10 sm:h-11.5": size === "small",
        },
      )}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          className="object-cover object-center"
          fill
        />
      ) : (
        <FaUserCircle className="w-full h-full text-gray-400/70 scale-[1.06]" />
      )}
    </div>
  );
};

export const AvatarSkeleton = ({ size }: IAvatarContainer) => {
  return (
    <Skeleton
      className={cn("rounded-full border border-gray-200", {
        "w-40 sm:w-50 h-40 sm:h-50": size === "full",
        "w-10 sm:w-11.5 h-10 sm:h-11.5": size === "small",
      })}
      theme="darkgray"
    />
  );
};
