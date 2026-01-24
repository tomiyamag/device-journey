import { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

interface IDeviceSpec {
  title: string;
  detail: ReactNode;
  size?: "base" | "lg";
}

const DeviceSpec = ({ title, detail, size = "base" }: IDeviceSpec) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-md border border-gray-200 shadow-xs bg-white",
        {
          "text-xs p-2": size === "base",
          "text-xs sm:text-sm p-2 sm:p-3": size === "lg",
        },
      )}
    >
      <div className="font-bold text-gray-400">{title}</div>
      <div>{detail}</div>
    </div>
  );
};

export default DeviceSpec;
