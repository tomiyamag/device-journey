import { ReactNode } from "react";

interface IDeviceDetailTableRow {
  head: string;
  children: ReactNode;
}

const DeviceDetailTableRow = ({ head, children }: IDeviceDetailTableRow) => {
  return (
    <tr className="group">
      <th className="w-30 sm:w-44 bg-gray-100 py-3 px-3.5 border-b border-b-gray-200 group-first:rounded-tl-md group-last:rounded-bl-md group-last:border-0">
        {head}
      </th>
      <td className="bg-white py-3 px-3.5 border-b border-b-gray-200 group-first:rounded-tr-md group-last:rounded-br-md group-last:border-0">
        {children}
      </td>
    </tr>
  );
};

export default DeviceDetailTableRow;
