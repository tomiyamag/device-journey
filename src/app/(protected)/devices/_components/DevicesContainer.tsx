import { getDevices } from "@/lib/queries/devices";
import { getSessionUser } from "@/lib/queries/user";

import Devices from "./Devices";

const DevicesContainer = async () => {
  const user = await getSessionUser();

  if (!user) {
    return null;
  }

  const devices = await getDevices(user.id);

  return <Devices devices={devices} />;
};

export default DevicesContainer;
