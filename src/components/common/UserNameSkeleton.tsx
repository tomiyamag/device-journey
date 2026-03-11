import Skeleton from "../ui/Skeleton";

export const UserNameSkeleton = () => {
  return (
    <div className="flex flex-col gap-1">
      <Skeleton className="w-32 h-6 rounded-sm" />
      <Skeleton className="w-40 h-6 rounded-sm" theme="darkgray" />
    </div>
  );
};
