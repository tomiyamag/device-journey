import { getDevices } from "@/lib/queries/devices";

import OtherDevices from "./OtherDevices";

const OtherDevicesContainer = async () => {
  const devices = await getDevices();
  return <OtherDevices devices={devices} />;
};

export default OtherDevicesContainer;
