import PageHeading from "@/components/common/PageHeading";
import { getDevices } from "@/lib/queries/devices";
import { getUser } from "@/lib/queries/user";

import { checkHasMainDevice } from "../../../_lib/utils";
import { getDeviceById } from "../../_lib/queries";
import EditDeviceForm from "./EditDeviceForm";

interface IEditDeviceFormContainer {
  params: Promise<{ id: string }>;
}

const EditDeviceFormContainer = async ({
  params,
}: IEditDeviceFormContainer) => {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const { id } = await params;

  // NOTE: メインデバイス設定の有無を判定するため全てのデバイスも同時に取得
  const [device, devices] = await Promise.all([
    getDeviceById(user.id, id),
    getDevices(user.id),
  ]);

  if (!device) {
    // TODO: notFound()
    return null;
  }

  const isAlreadyMainDevice = checkHasMainDevice(devices);

  return (
    <div>
      <PageHeading label={`${device.brand} ${device.name}`} />
      <EditDeviceForm
        device={device}
        id={id}
        isAlreadyMainDevice={isAlreadyMainDevice}
      />
    </div>
  );
};

export default EditDeviceFormContainer;
