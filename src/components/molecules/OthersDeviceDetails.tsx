import { DeviceStatus as DeviceStatusType } from "@/types";

import DeviceStatus from "../atoms/DeviceStatus";

interface IOthersDeviceDetails {
  name: string;
  status?: DeviceStatusType | null;
}

const OthersDeviceDetails = ({ name, status }: IOthersDeviceDetails) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm sm:text-base truncate">{name}</h3>
        <DeviceStatus className="absolute top-3.5 right-3.5" status={status} />
      </div>
    </div>
  );
};

export default OthersDeviceDetails;
