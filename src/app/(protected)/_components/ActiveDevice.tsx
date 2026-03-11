import Panel from "@/components/ui/Panel";
import { Device } from "@/types";

import ActiveDeviceDetail from "./ActiveDeviceDetail";
import ActiveDeviceFeatures from "./ActiveDeviceFeatures";
import NoActiveDevice from "./NoActiveDevice";

interface IActiveDevice {
  devices: Device[];
}

const ActiveDevice = ({ devices }: IActiveDevice) => {
  const mainDevice = devices.find((item) => item.is_main);

  if (devices.length < 1) {
    return (
      <NoActiveDevice
        href="/devices/search"
        content={
          <>
            まだデバイスが登録されていません。
            <br />
            使用中のデバイスを登録してみましょう！
          </>
        }
      />
    );
  }

  if (!mainDevice) {
    return (
      <NoActiveDevice
        href="/devices"
        content={
          <>
            メインデバイスが登録されていません。
            <br />
            登録済みのデバイス情報を編集してみましょう！
          </>
        }
      />
    );
  }

  return (
    <Panel footer={<ActiveDeviceFeatures device={mainDevice} />}>
      <ActiveDeviceDetail device={mainDevice} />
    </Panel>
  );
};

export default ActiveDevice;
