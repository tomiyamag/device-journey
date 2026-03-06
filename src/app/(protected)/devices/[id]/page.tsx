import { Suspense } from "react";

import BackHome from "@/components/common/BackHome";

import DeviceDetailContainer from "./_components/DeviceDetailContainer";
import DeviceDetailSkeleton from "./_components/DeviceDetailSkeleton";
import DeviceUpdatedToast from "./_components/DeviceUpdatedToast";

interface Props {
  params: Promise<{ id: string }>;
}

export default function DeviceDetailPage({ params }: Props) {
  return (
    <>
      <Suspense>
        <DeviceUpdatedToast />
      </Suspense>

      <section>
        <Suspense fallback={<DeviceDetailSkeleton />}>
          <DeviceDetailContainer params={params} />
        </Suspense>

        <BackHome
          prevItem={{
            href: "/devices",
            label: "マイデバイス",
          }}
        />
      </section>
    </>
  );
}
