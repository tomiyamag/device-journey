import { FaMoneyBills } from "react-icons/fa6";

import Feature from "../atoms/Feature";

const FeaturePrice = () => {
  return (
    <Feature icon={FaMoneyBills} title="購入価格" className="text-blue-500">
      <div>¥ 141,000</div>
    </Feature>
  );
};

export default FeaturePrice;
