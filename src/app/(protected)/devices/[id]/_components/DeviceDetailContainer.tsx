import PageHeading from "@/components/common/PageHeading";

import { getDeviceById } from "../_lib/queries";
import DeviceDetail from "./DeviceDetail";

interface IDeviceDetailContainer {
  id: string;
}

const DeviceDetailContainer = async ({ id }: IDeviceDetailContainer) => {
  const device = await getDeviceById(id);

  if (!device) {
    // TODO: notFound()
    return null;
  }

  return (
    <div>
      <PageHeading label={`${device.brand} ${device.name}`} />
      <DeviceDetail device={device} />
    </div>
  );
};

export default DeviceDetailContainer;
