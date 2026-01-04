import { getDeviceById } from "@/actions/devices";

import PageHeading from "../atoms/PageHeading";
import DeviceDetail from "../molecules/DeviceDetail";

interface IDeviceDetailContainer {
  id: string;
}

const DeviceDetailContainer = async ({ id }: IDeviceDetailContainer) => {
  const device = await getDeviceById(id);

  return (
    <div>
      <PageHeading label={`${device.brand} ${device.name}`} />
      <DeviceDetail device={device} />
    </div>
  );
};

export default DeviceDetailContainer;
