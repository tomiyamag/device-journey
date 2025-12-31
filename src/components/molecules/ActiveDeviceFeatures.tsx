import FeatureCostTody from "./FeatureCostTody";
import FeaturePeriod from "./FeaturePeriod";
import FeaturePrice from "./FeaturePrice";

const ActiveDeviceFeatures = () => {
  const items = [<FeaturePeriod />, <FeatureCostTody />, <FeaturePrice />];

  return (
    <div className="flex gap-3 justify-between">
      {items.map((item, index) => (
        <div className="sm:w-1/3" key={index}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default ActiveDeviceFeatures;
