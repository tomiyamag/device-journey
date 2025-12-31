import { FaCoffee } from "react-icons/fa";
import Feature from "../atoms/Feature";

const FeatureCostTody = () => {
  return (
    // TODO: アイコン・カラー出し分け、ヘルプアイコン
    <Feature icon={FaCoffee} title="今日のコスト" className="text-amber-900">
      <div>¥ 320 / day</div>
    </Feature>
  );
};

export default FeatureCostTody;
