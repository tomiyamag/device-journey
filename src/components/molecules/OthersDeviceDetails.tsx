import { DeviceStatus } from "@/types";

import DeviceStatus from "../atoms/DeviceStatus";

interface IOthersDeviceDetails {
  name: string;
  status?: DeviceStatus;
}

const OthersDeviceDetails = ({ name, status }: IOthersDeviceDetails) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold">{name}</h3>
        <DeviceStatus className="absolute top-3.5 right-3.5" status={status} />
      </div>
    </div>
  );
};

export default OthersDeviceDetails;
