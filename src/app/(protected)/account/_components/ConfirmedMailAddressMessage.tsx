// NOTE: メールアドレス確認・変更結果のトースト

"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface IConfirmedMailAddressMessage {
  successMessage?: string;
  errorMessage?: string;
}

const ConfirmedMailAddressMessage = ({
  successMessage,
  errorMessage,
}: IConfirmedMailAddressMessage) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!successMessage && !errorMessage) return;

    if (successMessage) {
      toast.success(successMessage, {
        // NOTE: 開発時にトーストが二つ表示されないよう id を指定
        id: "email-confirmed",
      });
    }

    if (errorMessage) {
      toast.error(errorMessage, {
        id: "email-confirm-error",
      });
    }

    router.replace(pathname, { scroll: false });
  }, [successMessage, errorMessage, router, pathname]);

  return null;
};

export default ConfirmedMailAddressMessage;
