import PageHeading from "@/components/common/PageHeading";
import { getSessionUser } from "@/lib/queries/user";

import { getDeviceById } from "../_lib/queries";
import DeviceDetail from "./DeviceDetail";

interface IDeviceDetailContainer {
  params: Promise<{ id: string }>;
}

const DeviceDetailContainer = async ({ params }: IDeviceDetailContainer) => {
  const user = await getSessionUser();

  if (!user) {
    return null;
  }

  const { id } = await params;
  const device = await getDeviceById(user.id, id);

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
