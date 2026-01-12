import { useProfile } from "@/hooks/useProfile";

import HeaderUserNameSkeleton from "./HeaderUserNameSkeleton";

export interface IHeaderUserName {
  isHome?: boolean;
}

const HeaderUserName = ({ isHome }: IHeaderUserName) => {
  const { data: userProfile, isLoading, isError } = useProfile();

  if (isLoading || isError) {
    return <HeaderUserNameSkeleton />;
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
