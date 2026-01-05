import ContentLoadingSpinner from "../atoms/ContentLoadingSpinner";
import Skeleton from "../atoms/Skeleton";

const DeviceDetailContainerSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 mb-8">
        <Skeleton className="h-7 w-3xs rounded-sm mx-auto" />
        <span className="border-b border-b-teal-600 w-7 mx-auto"></span>
      </div>

      <div className="flex flex-col gap-9">
        <div className="flex flex-wrap gap-2 justify-center">
          <Skeleton className="w-16 h-6 rounded-sm" />
          <Skeleton className="w-24 h-6 rounded-sm" />
          <Skeleton className="w-28 h-6 rounded-sm" />
        </div>

        <Skeleton className="w-54 h-54 mx-auto rounded-lg" />

        <div className="flex gap-4 justify-center">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton
              key={i}
              className="w-2/5 sm:w-1/5 h-8 sm:h-10 rounded-md"
            />
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-md" />
          ))}
        </div>
      </div>

      <ContentLoadingSpinner className="py-34" />
    </div>
  );
};

export default DeviceDetailContainerSkeleton;
