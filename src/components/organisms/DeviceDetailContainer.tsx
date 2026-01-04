"use client";

import { useDevice } from "@/hooks/useDevice";

import ContentLoadingSpinner from "../atoms/ContentLoadingSpinner";
import PageHeading from "../atoms/PageHeading";
import DeviceDetail from "../molecules/DeviceDetail";

interface IDeviceDetailContainer {
  id: string;
}

const DeviceDetailContainer = ({ id }: IDeviceDetailContainer) => {
  const { data: device, isLoading } = useDevice(id);

  if (isLoading) {
    return <ContentLoadingSpinner className="py-34" />;
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
