"use client";

import classNames from "classnames";
import Image from "next/image";
import { useMemo } from "react";
import { FaUserCircle } from "react-icons/fa";

import { useProfile } from "@/hooks/useProfile";
import { getAvatarUrl } from "@/utils/getAvatarUrl";

import AvatarSkeleton from "./AvatarSkeleton";

export interface IAvatar {
  size?: "full" | "small";
  preview?: string | null;
}

const Avatar = ({ size = "full", preview }: IAvatar) => {
  const { data: userProfile, isLoading, isError } = useProfile();

  const url = useMemo(() => {
    if (!userProfile) {
      return null;
    }
    return getAvatarUrl(userProfile.avatar_url);
  }, [userProfile]);

  if (isLoading || isError) {
    return <AvatarSkeleton size={size} />;
  }

  if (!userProfile) {
    return null;
  }

  const imageSrc = preview || url;

  return (
    <div
      className={classNames(
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

export default Avatar;
