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
      <strong>{userProfile.username || "No Name"}</strong>
    </h1>
  );
};

export default HeaderUserName;
