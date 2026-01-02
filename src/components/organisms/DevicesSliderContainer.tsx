import { getDevices } from "@/actions/devices";

import DevicesSlider from "./DevicesSlider";

const DevicesSliderContainer = async () => {
  const devices = await getDevices();
  return <DevicesSlider devices={devices} />;
};

export default DevicesSliderContainer;
