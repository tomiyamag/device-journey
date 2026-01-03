import { ReactNode } from "react";

interface IDeviceListItemField {
  title: string;
  children: ReactNode;
}

const DeviceListItemField = ({ title, children }: IDeviceListItemField) => {
  return (
    <div className="flex gap-2 text-xs">
      <div className="font-bold text-gray-600">{title}</div>
      <div className="text-gray-600">{children}</div>
    </div>
  );
};

export default DeviceListItemField;
