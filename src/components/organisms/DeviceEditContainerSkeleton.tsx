import ContentLoadingSpinner from "../atoms/ContentLoadingSpinner";
import Skeleton from "../atoms/Skeleton";

const DeviceEditContainerSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 mb-8">
        <Skeleton className="h-7 w-3xs rounded-sm mx-auto" />
        <span className="border-b border-b-teal-600 w-7 mx-auto"></span>
      </div>
      <ContentLoadingSpinner className="py-34" />
    </div>
  );
};

export default DeviceEditContainerSkeleton;
