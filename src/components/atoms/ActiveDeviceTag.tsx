import { ReactNode } from "react";

interface IActiveDeviceTag {
  children: ReactNode;
}

const ActiveDeviceTag = ({ children }: IActiveDeviceTag) => {
  return (
    <div className="flex gap-1 items-center bg-teal-600 px-1.5 py-1 text-xs rounded-sm leading-none text-[.625rem] text-white">
      {children}
    </div>
  );
};

export default ActiveDeviceTag;
