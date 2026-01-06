import Link from "next/link";

import { useProfile } from "@/hooks/useProfile";

import HeaderUserNameSkeleton from "./HeaderUserNameSkeleton";

export interface IHeaderUserName {
  isDashboard?: boolean;
}

const HeaderUserName = ({ isDashboard }: IHeaderUserName) => {
  const { data: userProfile, isLoading } = useProfile();

  if (isLoading) {
    return <HeaderUserNameSkeleton isDashboard={isDashboard} />;
  }

  if (!userProfile) {
    return null;
  }

  return (
    <h1>
      {isDashboard && (
        <>
          おかえりなさい、
          <br />
        </>
      )}
      <span className="flex items-center gap-3">
        {!isDashboard && (
          <Link
            href="/dashboard"
            className="transition-opacity hover:opacity-80"
          >
            🏠
          </Link>
        )}
        <strong>{userProfile.username}</strong>
      </span>
    </h1>
  );
};

export default HeaderUserName;
