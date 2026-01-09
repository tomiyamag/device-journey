import Skeleton from "../atoms/Skeleton";

const ActiveDeviceInformationSkeleton = () => {
  return (
    <div className="rounded-xl p-1 relative bg-gray-200">
      <div className="flex gap-3.5 items-center bg-white py-5 px-4 rounded-lg">
        <Skeleton
          className="rounded-lg w-48 h-44 hidden sm:block"
          theme="darkgray"
        />

        <div className="flex-1">
          <div className="mb-4 sm:mb-2.5 flex items-center gap-3">
            <Skeleton
              className="rounded-lg w-30 h-28 sm:hidden"
              theme="darkgray"
            />

            <div className="flex-1">
              <Skeleton
                className="mb-1.5 h-6 w-full sm:w-1/2 rounded-sm"
                theme="darkgray"
              />

              <div className="flex flex-wrap gap-1">
                <Skeleton className="h-4 w-14 rounded-sm" />
                <Skeleton className="h-4 w-18 rounded-sm" />
                <Skeleton className="h-4 w-20 rounded-sm" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-13 rounded-md" />
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 sm:gap-3 justify-around sm:justify-between [&>div]:w-1/3 py-2 sm:py-2.5 px-2 sm:px-4 mt-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-2 sm:gap-4 w-full whitespace-nowrap"
          >
            <Skeleton
              className="rounded-full w-7 sm:w-9 h-7 sm:h-9 shrink-0"
              theme="white"
            />

            <div className="flex flex-col gap-1 w-full">
              <Skeleton
                className="w-1/2 h-2.5 sm:h-4 rounded-xs sm:rounded-sm"
                theme="white"
              />
              <Skeleton
                className="w-full h-2.5 sm:h-4 rounded-xs sm:rounded-sm"
                theme="white"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveDeviceInformationSkeleton;
