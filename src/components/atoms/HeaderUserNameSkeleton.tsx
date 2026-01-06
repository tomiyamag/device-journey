import { IHeaderUserName } from "./HeaderUserName";
import Skeleton from "./Skeleton";

const HeaderUserNameSkeleton = ({ isDashboard }: IHeaderUserName) => {
  return (
    <div className="flex flex-col gap-1">
      {isDashboard && <Skeleton className="w-32 h-6 rounded-sm" />}
      <Skeleton className="w-40 h-6 rounded-sm" />
    </div>
  );
};

export default HeaderUserNameSkeleton;
