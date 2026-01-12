"use client";

import { useDevice } from "@/hooks/useDevice";

import ErrorText from "../atoms/ErrorText";
import PageHeading from "../atoms/PageHeading";
import DeviceDetail from "../molecules/DeviceDetail";
import DeviceDetailContainerSkeleton from "./DeviceDetailContainerSkeleton";

interface IDeviceDetailContainer {
  id: string;
}

const DeviceDetailContainer = ({ id }: IDeviceDetailContainer) => {
  const { data: device, isLoading, isError, error } = useDevice(id);

  if (isLoading) {
    return <DeviceDetailContainerSkeleton />;
  }

  if (isError) {
    return <ErrorText>{error.message}</ErrorText>;
  }

  if (!device) {
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
