import { Suspense } from "react";

import BackHome from "@/components/common/BackHome";

import DeviceDetailContainer from "./_components/DeviceDetailContainer";
import DeviceDetailSkeleton from "./_components/DeviceDetailSkeleton";

interface Props {
  params: Promise<{ id: string }>;
}

export default function DeviceDetailPage({ params }: Props) {
  return (
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
  );
}
