"use client";

import { useDevices } from "@/hooks/useDevices";

import InformationCard from "../atoms/InformationCard";
import ActiveDeviceDetail from "./ActiveDeviceDetail";
import ActiveDeviceFeatures from "./ActiveDeviceFeatures";
import ActiveDeviceInformationNotFound from "./ActiveDeviceInformationNotFound";
import ActiveDeviceInformationSkeleton from "./ActiveDeviceInformationSkeleton";

const ActiveDeviceInformation = () => {
  const { data: devices, isLoading } = useDevices();

  if (isLoading) {
    return <ActiveDeviceInformationSkeleton />;
  }

  if (!devices) {
    return null;
  }

  if (devices.length < 1) {
    return (
      <ActiveDeviceInformationNotFound
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

  const device = devices.find((item) => item.is_main);

  if (!device) {
    return (
      <ActiveDeviceInformationNotFound
        href="/devices"
        content={
          <>
            メインデバイスが登録されていません。
            <br />
            デバイス一覧から選んでみましょう！
          </>
        }
      />
    );
  }

  return (
    <InformationCard footer={<ActiveDeviceFeatures device={device} />}>
      <ActiveDeviceDetail device={device} />
    </InformationCard>
  );
};

export default ActiveDeviceInformation;
