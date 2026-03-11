import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

import { cn } from "@/lib/utils/cn";
import { getAvatarUrl } from "@/lib/utils/getAvatarUrl";
import { UserProfile } from "@/types";

import Skeleton from "./Skeleton";

export interface IAvatar {
  userProfile: UserProfile;
  size?: "full" | "small";
  preview?: string | null;
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

type AvatarSkeletonProps = Omit<IAvatar, "userProfile" | "preview">;

export const AvatarSkeleton = ({ size }: AvatarSkeletonProps) => {
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
