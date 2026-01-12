"use client";

import { useDevices } from "@/hooks/useDevices";

import ErrorText from "../atoms/ErrorText";
import InformationCard from "../atoms/InformationCard";
import ActiveDeviceDetail from "./ActiveDeviceDetail";
import ActiveDeviceFeatures from "./ActiveDeviceFeatures";
import ActiveDeviceInformationNotFound from "./ActiveDeviceInformationNotFound";
import ActiveDeviceInformationSkeleton from "./ActiveDeviceInformationSkeleton";

const ActiveDeviceInformation = () => {
  const { data: devices, isLoading, isError, error } = useDevices();

  if (isLoading) {
    return <ActiveDeviceInformationSkeleton />;
  }

  if (isError) {
    return <ErrorText>{error.message}</ErrorText>;
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
            登録済みのデバイス情報を編集してみましょう！
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
