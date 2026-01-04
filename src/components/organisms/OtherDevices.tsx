import AppLink from "../atoms/AppLink";
import InformationHeading from "../atoms/InformationHeading";
import DevicesSliderContainer from "./DevicesSliderContainer";

const OtherDevices = () => {
  return (
    <>
      <InformationHeading
        action={<AppLink href="/devices" label="デバイスを管理" />}
      >
        その他のデバイス
      </InformationHeading>
      <DevicesSliderContainer />
    </>
  );
};

export default OtherDevices;
