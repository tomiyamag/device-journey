import { Suspense } from "react";

import ContentLoadingSpinner from "@/components/atoms/ContentLoadingSpinner";
import BackHome from "@/components/molecules/BackHome";
import DeviceDetailContainer from "@/components/organisms/DeviceDetailContainer";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DeviceDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <section>
      <Suspense fallback={<ContentLoadingSpinner className="py-34" />}>
        <DeviceDetailContainer id={id} />
      </Suspense>

      <BackHome
        prevItem={{
          href: "/devices",
          label: "デバイス一覧",
        }}
      />
    </section>
  );
}
