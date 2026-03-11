import FeatureCostToday from "@/components/common/FeatureCostToday";
import FeaturePeriod from "@/components/common/FeaturePeriod";
import FeaturePrice from "@/components/common/FeaturePrice";
import { Device } from "@/types";

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
        <FeatureCostToday device={device} isHome={true} />
      </div>
      <div>
        <FeaturePrice device={device} />
      </div>
    </div>
  );
};

export default ActiveDeviceFeatures;
