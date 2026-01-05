import Skeleton from "../atoms/Skeleton";

const DeviceListSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-20 h-5 mx-auto rounded-sm" />
      <Skeleton className="w-24 h-5 ml-auto mr-0 rounded-sm" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="rounded-xl p-1" theme="darkgray">
            <div className="bg-white py-5 px-4 rounded-lg">
              <div className="h-36 sm:h-40" />
            </div>

            <div className="py-2 px-2 sm:px-4 mt-1">
              <div className="flex flex-col gap-2">
                <Skeleton className="w-3/4 h-6 rounded-md" theme="white" />

                <div className="flex flex-col gap-1 pb-0.5">
                  <div className="flex gap-2">
                    <Skeleton className="w-8 h-4 rounded-sm" theme="white" />
                    <Skeleton className="w-24 h-4 rounded-sm" theme="white" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="w-12 h-4 rounded-sm" theme="white" />
                    <Skeleton className="w-28 h-4 rounded-sm" theme="white" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="w-16 h-4 rounded-sm" theme="white" />
                    <Skeleton className="w-32 h-4 rounded-sm" theme="white" />
                  </div>
                </div>
              </div>
            </div>
          </Skeleton>
        ))}
      </div>
    </div>
  );
};

export default DeviceListSkeleton;
