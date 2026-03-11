"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const DeviceUpdatedToast = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const updated = searchParams.get("updated");

    if (updated) {
      toast.success("デバイス情報を変更しました。", {
        // NOTE: 開発時にトーストが二つ表示されないよう id を指定
        id: "device-updated",
      });

      router.replace(pathname, { scroll: false });
    }
  }, [searchParams, router, pathname]);

  return null;
};

export default DeviceUpdatedToast;
