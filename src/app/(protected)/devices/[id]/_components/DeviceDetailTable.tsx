import { ReactNode } from "react";

interface IDeviceTable {
  children: ReactNode;
}

const DeviceDetailTable = ({ children }: IDeviceTable) => {
  return (
    <table className="border-separate border-spacing-0 bg-gray-200 rounded-lg border-2 border-gray-200 text-sm sm:text-base">
      <tbody>{children}</tbody>
    </table>
  );
};

export default DeviceDetailTable;
