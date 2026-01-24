import { ReactNode } from "react";

interface IDeviceDetailField {
  title: string;
  children: ReactNode;
}

const DeviceDetailField = ({ title, children }: IDeviceDetailField) => {
  return (
    <div className="flex gap-2 text-xs">
      <div className="font-bold text-gray-600">{title}</div>
      <div className="text-gray-600">{children}</div>
    </div>
  );
};

export default DeviceDetailField;
