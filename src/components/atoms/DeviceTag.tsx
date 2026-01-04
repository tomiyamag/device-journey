import classNames from "classnames";
import { ReactNode } from "react";

interface IDeviceTag {
  size?: "base" | "lg";
  children: ReactNode;
}

const DeviceTag = ({ size = "base", children }: IDeviceTag) => {
  return (
    <div
      className={classNames(
        "flex items-center bg-teal-600 rounded-sm leading-none text-white",
        {
          "gap-1 px-1.5 py-1 text-[0.625rem]": size === "base",
          "gap-1.5 px-2 py-1.5 text-[0.6875rem]": size === "lg",
        },
      )}
    >
      {children}
    </div>
  );
};

export default DeviceTag;
