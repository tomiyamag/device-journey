import { Suspense } from "react";

import BackHome from "@/components/common/BackHome";
import PageHeading from "@/components/common/PageHeading";

import DevicesContainer from "./_components/DevicesContainer";
import DevicesSkeleton from "./_components/DevicesSkeleton";

export default function DevicesPage() {
  return (
    <section>
      <PageHeading label="マイデバイス" />

      <Suspense fallback={<DevicesSkeleton />}>
        <DevicesContainer />
      </Suspense>

      <BackHome />
    </section>
  );
}
