import { Suspense } from "react";

import BackHome from "@/components/common/BackHome";

import DeviceDetailContainer from "./_components/DeviceDetailContainer";
import DeviceDetailSkeleton from "./_components/DeviceDetailSkeleton";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DeviceDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <section>
      <Suspense fallback={<DeviceDetailSkeleton />}>
        <DeviceDetailContainer id={id} />
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
