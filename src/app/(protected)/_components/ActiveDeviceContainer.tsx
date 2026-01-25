import { getDevices } from "@/actions/devices";

import ActiveDevice from "./ActiveDevice";

const ActiveDeviceContainer = async () => {
  const devices = await getDevices();
  return <ActiveDevice devices={devices} />;
};

export default ActiveDeviceContainer;
