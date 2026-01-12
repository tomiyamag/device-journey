"use client";

import { usePathname } from "next/navigation";

import Skeleton from "./Skeleton";

const HeaderUserNameSkeleton = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="flex flex-col gap-1">
      {isHome && <Skeleton className="w-32 h-6 rounded-sm" />}
      <Skeleton className="w-40 h-6 rounded-sm" theme="darkgray" />
    </div>
  );
};

export default HeaderUserNameSkeleton;
