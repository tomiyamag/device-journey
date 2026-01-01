"use client";

import { useState } from "react";

import PageHeading from "@/components/atoms/PageHeading";
import SearchDeviceForm from "@/components/molecules/SearchDeviceForm";

export default function DevicesAddPage() {
  const [deviceId, setDeviceId] = useState<number | null>(null);

  return (
    <section>
      <div>
        <PageHeading label="新規端末登録" />
        <SearchDeviceForm onDeviceSelected={(id) => setDeviceId(id)} />

        {deviceId && <div>{deviceId}</div>}
      </div>
    </section>
  );
}
