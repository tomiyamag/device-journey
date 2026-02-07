import { getDevices } from "@/lib/queries/devices";

import ActiveDevice from "./ActiveDevice";

const ActiveDeviceContainer = async () => {
  const devices = await getDevices();
  return <ActiveDevice devices={devices} />;
};

export default ActiveDeviceContainer;
