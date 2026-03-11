"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { useDeviceDraftStore } from "../_stores/useDeviceDraftStore";
import { useDeviceSearchStore } from "../_stores/useDeviceSearchStore";

const DeviceAddedToast = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const clearDraft = useDeviceDraftStore((state) => state.clearDraft);
  const clearSearch = useDeviceSearchStore((state) => state.clearSearch);

  useEffect(() => {
    const registered = searchParams.get("registered");

    if (registered) {
      toast.success("デバイスを登録しました。", {
        // NOTE: 開発時にトーストが二つ表示されないよう id を指定
        id: "device-registered",
      });

      clearDraft();
      clearSearch();

      router.replace(pathname, { scroll: false });
    }
  }, [searchParams, router, clearDraft, clearSearch, pathname]);

  return null;
};

export default DeviceAddedToast;
