"use client";

import { useState } from "react";

import PageHeading from "@/components/atoms/PageHeading";
import SearchDeviceForm from "@/components/molecules/SearchDeviceForm";
import SearchDeviceResult from "@/components/molecules/SearchDeviceResult";

export default function DevicesSearchPage() {
  const [deviceId, setDeviceId] = useState<number | null>(null);

  return (
    <section>
      <div className="flex flex-col gap-9">
        <div>
          <PageHeading label="新規登録する端末を検索" />
          <SearchDeviceForm onDeviceSelected={(id) => setDeviceId(id)} />
        </div>

        {deviceId && <SearchDeviceResult deviceId={deviceId} />}
      </div>
    </section>
  );
}
