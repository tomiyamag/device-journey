// NOTE: メールアドレス確認成功時

"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface IConfirmedMailAddressMessage {
  message?: string;
}

const ConfirmedMailAddressMessage = ({
  message,
}: IConfirmedMailAddressMessage) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (message) {
      toast.success(message, {
        // NOTE: 開発時にトーストが二つ表示されないよう id を指定
        id: "email-confirmed",
      });
      router.replace(pathname, { scroll: false });
    }
  }, [message, router, pathname]);

  return null;
};

export default ConfirmedMailAddressMessage;
