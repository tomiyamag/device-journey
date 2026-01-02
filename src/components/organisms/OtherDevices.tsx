import { Suspense } from "react";

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

      <Suspense fallback={"ロード中"}>
        <DevicesSliderContainer />
      </Suspense>
    </>
  );
};

export default OtherDevices;
