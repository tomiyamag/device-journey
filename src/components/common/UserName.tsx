"use client";

import { usePathname } from "next/navigation";

import { UserProfile } from "@/types";

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
