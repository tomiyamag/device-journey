"use client";

import { useDevices } from "@/hooks/useDevices";

import DevicesSlider from "./DevicesSlider";

const DevicesSliderContainer = () => {
  const { data: devices, isLoading } = useDevices();

  if (isLoading) {
    return <>ロード中</>;
  }

  if (!devices) {
    return null;
  }

  return <DevicesSlider devices={devices} />;
};

export default DevicesSliderContainer;
