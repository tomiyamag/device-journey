import { getDevices } from "@/lib/queries/devices";
import { getUser } from "@/lib/queries/user";

import OtherDevices from "./OtherDevices";

const OtherDevicesContainer = async () => {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const devices = await getDevices(user.id);

  return <OtherDevices devices={devices} />;
};

export default OtherDevicesContainer;
