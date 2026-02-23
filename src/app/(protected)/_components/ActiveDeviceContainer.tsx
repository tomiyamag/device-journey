import { getDevices } from "@/lib/queries/devices";
import { getSessionUser } from "@/lib/queries/user";

import ActiveDevice from "./ActiveDevice";

const ActiveDeviceContainer = async () => {
  const user = await getSessionUser();

  if (!user) {
    return null;
  }

  const devices = await getDevices(user.id);

  return <ActiveDevice devices={devices} />;
};

export default ActiveDeviceContainer;
