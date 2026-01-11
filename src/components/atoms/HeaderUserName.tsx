import { useProfile } from "@/hooks/useProfile";

import HeaderUserNameSkeleton from "./HeaderUserNameSkeleton";

export interface IHeaderUserName {
  isHome?: boolean;
}

const HeaderUserName = ({ isHome }: IHeaderUserName) => {
  const { data: userProfile, isLoading } = useProfile();

  if (isLoading) {
    return <HeaderUserNameSkeleton isHome={isHome} />;
  }

  if (!userProfile) {
    return null;
  }

  return (
    <h1>
      {isHome && (
        <>
          おかえりなさい、
          <br />
        </>
      )}
      <strong>{userProfile.username || "No Name"}</strong>
    </h1>
  );
};

export default HeaderUserName;
