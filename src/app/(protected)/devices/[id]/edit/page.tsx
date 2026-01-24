import { Suspense } from "react";

import EditDeviceFormContainer from "./_components/EditDeviceFormContainer";
import EditDeviceFormSkeleton from "./_components/EditDeviceFormSkeleton";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DeviceEditPage({ params }: Props) {
  const { id } = await params;

  return (
    <section>
      <Suspense fallback={<EditDeviceFormSkeleton />}>
        <EditDeviceFormContainer id={id} />
      </Suspense>
    </section>
  );
}
