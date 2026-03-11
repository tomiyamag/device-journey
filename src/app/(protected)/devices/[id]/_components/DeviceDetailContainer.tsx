import PageHeading from "@/components/common/PageHeading";
import { getUser } from "@/lib/queries/user";

import { getDeviceById } from "../_lib/queries";
import DeviceDetail from "./DeviceDetail";

interface IDeviceDetailContainer {
  params: Promise<{ id: string }>;
}

const DeviceDetailContainer = async ({ params }: IDeviceDetailContainer) => {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const userId = user.id;
  const { id: deviceId } = await params;

  const device = await getDeviceById(userId, deviceId);

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
