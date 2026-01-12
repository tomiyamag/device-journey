"use client";

import { useDevices } from "@/hooks/useDevices";

import ErrorText from "../atoms/ErrorText";
import DevicesSlider from "./DevicesSlider";
import DevicesSliderContainerSkeleton from "./DevicesSliderContainerSkeleton";

const DevicesSliderContainer = () => {
  const { data: devices, isLoading, isError, error } = useDevices();

  if (isLoading) {
    return <DevicesSliderContainerSkeleton />;
  }

  if (isError) {
    return <ErrorText>{error.message}</ErrorText>;
  }

  if (!devices) {
    return null;
  }

  return <DevicesSlider devices={devices} />;
};

export default DevicesSliderContainer;
