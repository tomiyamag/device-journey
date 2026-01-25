"use client";

import { usePathname } from "next/navigation";

import { UserProfile } from "@/types";

import Skeleton from "../ui/Skeleton";

interface IUserName {
  data: UserProfile;
}

export const UserName = ({ data }: IUserName) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <h1>
      {isHome && (
        <>
          おかえりなさい、
          <br />
        </>
      )}
      <strong>{data.username || "No Name"}</strong>
    </h1>
  );
};

export const UserNameSkeleton = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="flex flex-col gap-1">
      {isHome && <Skeleton className="w-32 h-6 rounded-sm" />}
      <Skeleton className="w-40 h-6 rounded-sm" theme="darkgray" />
    </div>
  );
};
