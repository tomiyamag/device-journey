import PageHeading from "@/components/common/PageHeading";
import { getSessionUser } from "@/lib/queries/user";

import { getDeviceById } from "../../_lib/queries";
import EditDeviceForm from "./EditDeviceForm";

interface IEditDeviceFormContainer {
  params: Promise<{ id: string }>;
}

const EditDeviceFormContainer = async ({
  params,
}: IEditDeviceFormContainer) => {
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
      <EditDeviceForm device={device} id={id} />
    </div>
  );
};

export default EditDeviceFormContainer;
