"use client";

import { useDevice } from "@/hooks/useDevice";

import PageHeading from "../atoms/PageHeading";
import DeviceEditContainerSkeleton from "./DeviceEditContainerSkeleton";
import EditDeviceForm from "./EditDeviceForm";

interface IDeviceEditContainer {
  id: string;
}

const DeviceEditContainer = ({ id }: IDeviceEditContainer) => {
  const { data: device, isLoading } = useDevice(id);

  if (isLoading) {
    return <DeviceEditContainerSkeleton />;
  }

  if (!device) {
    return null;
  }

  return (
    <div>
      <PageHeading label={`${device.brand} ${device.name}`} />
      <EditDeviceForm id={id} />
    </div>
  );
};

export default DeviceEditContainer;
