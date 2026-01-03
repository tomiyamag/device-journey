import { Device } from "@/types";

import FeatureCostTody from "./FeatureCostTody";
import FeaturePeriod from "./FeaturePeriod";
import FeaturePrice from "./FeaturePrice";

interface IActiveDeviceFeatures {
  device: Device;
}

const features = [
  {
    id: "period",
    Component: FeaturePeriod,
  },
  {
    id: "costToday",
    Component: FeatureCostTody,
  },
  {
    id: "price",
    Component: FeaturePrice,
  },
];

const ActiveDeviceFeatures = ({ device }: IActiveDeviceFeatures) => {
  return (
    <div className="flex gap-3 justify-around sm:justify-between">
      {features.map(({ id, Component }) => (
        <div key={id} className="sm:w-1/3">
          <Component device={device} />
        </div>
      ))}
    </div>
  );
};

export default ActiveDeviceFeatures;
