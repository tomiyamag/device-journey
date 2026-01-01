import InformationHeading from "../atoms/InformationHeading";
import ManageLink from "../atoms/ManageLink";
import DevicesSlider from "./DevicesSlider";

const OtherDevices = () => {
  return (
    <>
      <InformationHeading
        action={<ManageLink href="/devices" label="端末を管理" />}
      >
        その他のデバイス
      </InformationHeading>

      <DevicesSlider />
    </>
  );
};

export default OtherDevices;
