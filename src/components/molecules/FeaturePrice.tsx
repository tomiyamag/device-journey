import { FaMoneyBills } from "react-icons/fa6";

import { Device } from "@/types";

import Feature from "../atoms/Feature";

interface IFeaturePrice {
  device: Device;
}

const FeaturePrice = ({ device }: IFeaturePrice) => {
  const purchasePrice = device.purchase_price;

  const price = () => {
    if (!purchasePrice) {
      return "--";
    }
    return Number(purchasePrice).toLocaleString();
  };

  return (
    <Feature icon={FaMoneyBills} title="購入価格" className="text-blue-500">
      <div>¥ {price()}</div>
    </Feature>
  );
};

export default FeaturePrice;
