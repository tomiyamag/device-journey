import { Suspense } from "react";

import AppLink from "@/components/ui/AppLink";

import ActiveDeviceContainer from "./_components/ActiveDeviceContainer";
import ActiveDeviceSkeleton from "./_components/ActiveDeviceSkeleton";
import ContentHeading from "./_components/ContentHeading";
import OtherDevicesContainer from "./_components/OtherDevicesContainer";
import OtherDevicesSkeleton from "./_components/OtherDevicesSkeleton";
import Pickups from "./_components/Pickups";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-9">
      <section>
        <div className="flex flex-col gap-2">
          <div>
            <ContentHeading>
              <span className="flex gap-2 items-center">
                <span className="-bg-linear-60 from-teal-400 via-teal-500 to-cyan-600 w-2 h-2 rounded-full"></span>
                メインのアクティブデバイス
              </span>
            </ContentHeading>

            <Suspense fallback={<ActiveDeviceSkeleton />}>
              <ActiveDeviceContainer />
            </Suspense>
          </div>

          <Pickups />
        </div>
      </section>

      <section>
        <ContentHeading
          action={<AppLink href="/devices" label="デバイスを管理" />}
        >
          その他のデバイス
        </ContentHeading>

        <Suspense fallback={<OtherDevicesSkeleton />}>
          <OtherDevicesContainer />
        </Suspense>
      </section>
    </div>
  );
}
