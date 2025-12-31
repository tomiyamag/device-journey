import { FaFire } from "react-icons/fa";

import Feature from "../atoms/Feature";

const FeaturePeriod = () => {
  return (
    <Feature icon={FaFire} title="使用期間" className="text-pink-500 w-1/3">
      <div>101 日目</div>
    </Feature>
  );
};

export default FeaturePeriod;
