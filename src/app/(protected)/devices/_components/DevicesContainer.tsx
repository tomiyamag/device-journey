import { getDevices } from "@/lib/queries/devices";

import Devices from "./Devices";

const DevicesContainer = async () => {
  const devices = await getDevices();
  return <Devices devices={devices} />;
};

export default DevicesContainer;
