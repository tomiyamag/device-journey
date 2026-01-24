import PageHeading from "@/components/common/PageHeading";

import { getDeviceById } from "../../_lib/queries";
import EditDeviceForm from "./EditDeviceForm";

interface IEditDeviceFormContainer {
  id: string;
}

const EditDeviceFormContainer = async ({ id }: IEditDeviceFormContainer) => {
  const device = await getDeviceById(id);

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
