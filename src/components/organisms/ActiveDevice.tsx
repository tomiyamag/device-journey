import { FaCircle } from "react-icons/fa";

import InformationHeading from "../atoms/InformationHeading";
import ActiveDeviceInformation from "../molecules/ActiveDeviceInformation";

const ActiveDevice = () => {
  return (
    <div>
      <InformationHeading>
        <span className="flex gap-2 items-center">
          <FaCircle size={8} className="text-teal-600" />
          メインのアクティブデバイス
        </span>
      </InformationHeading>
      <ActiveDeviceInformation />
    </div>
  );
};

export default ActiveDevice;
