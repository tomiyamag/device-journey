import { getDevices } from "@/actions/devices";

import InformationCard from "../atoms/InformationCard";
import ActiveDeviceDetail from "./ActiveDeviceDetail";
import ActiveDeviceFeatures from "./ActiveDeviceFeatures";

const ActiveDeviceInformation = async () => {
  const devices = await getDevices();
  const device = devices.find((item) => item.is_main);

  if (!device) {
    return null;
  }

  return (
    <InformationCard footer={<ActiveDeviceFeatures device={device} />}>
      <ActiveDeviceDetail device={device} />
    </InformationCard>
  );
};

export default ActiveDeviceInformation;
