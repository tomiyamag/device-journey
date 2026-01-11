import Skeleton from "../atoms/Skeleton";

const DevicesSliderContainerSkeleton = () => {
  return (
    <div className="flex gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton
          key={i}
          className="shrink-0 rounded-xl p-1 relative w-60 sm:w-3xs"
          theme="darkgray"
        >
          <div className="bg-white py-5 px-4 rounded-lg">
            <div className="w-28 h-28 mx-auto rounded-lg" />
          </div>
          <div className="py-2 px-2 sm:px-4 mt-1">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Skeleton
                  className="h-5 sm:h-6 w-3/4 rounded-sm"
                  theme="white"
                />
              </div>
            </div>
          </div>
        </Skeleton>
      ))}
    </div>
  );
};

export default DevicesSliderContainerSkeleton;
