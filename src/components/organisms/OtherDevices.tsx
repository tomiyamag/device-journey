import AppLink from "../atoms/AppLink";
import InformationHeading from "../atoms/InformationHeading";
import DevicesSlider from "./DevicesSlider";

const OtherDevices = () => {
  return (
    <>
      <InformationHeading
        action={<AppLink href="/devices" label="端末を管理" />}
      >
        その他のデバイス
      </InformationHeading>

      <DevicesSlider />
    </>
  );
};

export default OtherDevices;
