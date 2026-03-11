import { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

interface IDeviceTag {
  size?: "base" | "lg";
  children: ReactNode;
}

const DeviceTag = ({ size = "base", children }: IDeviceTag) => {
  return (
    <div
      className={cn(
        "flex items-center border border-teal-600 bg-teal-700/75 rounded-sm text-white",
        {
          "gap-1 px-1.5 py-0.5 text-[0.625rem] leading-none": size === "base",
          "gap-1.5 px-2 py-1 text-[0.6875rem] leading-none": size === "lg",
        },
      )}
    >
      {children}
    </div>
  );
};

export default DeviceTag;
