import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { FormState } from "@/types";

interface IUseFormResultToastOptions {
  showSuccessToast?: boolean;
}

export const useFormResultToast = (
  lastResult: FormState,
  options: IUseFormResultToastOptions = {},
) => {
  const { showSuccessToast = true } = options;

  /**
   * NOTE: useActionState はページ再アクセス時に前回の結果を復元するため、タイムスタンプで新規の送信結果かどうかを判定する
   *
   * @see
   * https://www.robinwieruch.de/react-server-actions-useactionstate-toast/
   */
  const timestamp = lastResult?.timestamp;
  const prevTimestamp = useRef(timestamp);

  useEffect(() => {
    if (!timestamp || prevTimestamp.current === timestamp) {
      return;
    }

    prevTimestamp.current = timestamp;

    if (showSuccessToast) {
      if (lastResult?.status === "success") {
        toast.success(lastResult.message);
      }
    }

    if (lastResult?.status === "error") {
      const globalErrors = lastResult.error?.[""];

      if (globalErrors) {
        toast.error(globalErrors[0]);
      }
    }
  }, [lastResult, timestamp, showSuccessToast]);
};
