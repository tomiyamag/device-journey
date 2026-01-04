import { Device } from "@/types";

import FeatureCostTody from "./FeatureCostTody";
import FeaturePeriod from "./FeaturePeriod";
import FeaturePrice from "./FeaturePrice";

interface IActiveDeviceFeatures {
  device: Device;
}

const ActiveDeviceFeatures = ({ device }: IActiveDeviceFeatures) => {
  return (
    <div className="flex gap-2 sm:gap-3 justify-around sm:justify-between [&>div]:w-1/3">
      <div>
        <FeaturePeriod device={device} />
      </div>
      <div>
        <FeatureCostTody device={device} dashboard={true} />
      </div>
      <div>
        <FeaturePrice device={device} />
      </div>
    </div>
  );
};

export default ActiveDeviceFeatures;
