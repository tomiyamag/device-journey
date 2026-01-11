"use client";

import { useDevices } from "@/hooks/useDevices";

import DevicesSlider from "./DevicesSlider";
import DevicesSliderContainerSkeleton from "./DevicesSliderContainerSkeleton";

const DevicesSliderContainer = () => {
  const { data: devices, isLoading } = useDevices();

  if (isLoading) {
    return <DevicesSliderContainerSkeleton />;
  }

  if (!devices) {
    return null;
  }

  return <DevicesSlider devices={devices} />;
};

export default DevicesSliderContainer;
