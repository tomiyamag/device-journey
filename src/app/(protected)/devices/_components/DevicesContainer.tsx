import { getDevices } from "@/lib/queries/devices";
import { getUser } from "@/lib/queries/user";

import Devices from "./Devices";

const DevicesContainer = async () => {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const devices = await getDevices(user.id);

  return <Devices devices={devices} />;
};

export default DevicesContainer;
