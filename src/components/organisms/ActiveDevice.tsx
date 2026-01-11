import InformationHeading from "../atoms/InformationHeading";
import ActiveDeviceInformation from "../molecules/ActiveDeviceInformation";

const ActiveDevice = () => {
  return (
    <div>
      <InformationHeading>
        <span className="flex gap-2 items-center">
          <span className="-bg-linear-60 from-teal-400 via-teal-500 to-cyan-600 w-2 h-2 rounded-full"></span>
          メインのアクティブデバイス
        </span>
      </InformationHeading>
      <ActiveDeviceInformation />
    </div>
  );
};

export default ActiveDevice;
