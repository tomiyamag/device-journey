import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";

import Button from "../atoms/Button";

interface IDialogFeatureCostToday {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DialogFeatureCostToday = ({
  isOpen,
  setIsOpen,
}: IDialogFeatureCostToday) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      transition
      className="relative z-50 transition ease-out data-closed:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg flex flex-col gap-5 bg-white/85 backdrop-blur-sm rounded-lg p-8 sm:p-10">
          <DialogTitle className="font-bold">コストの算出方法</DialogTitle>

          <div className="w-full flex flex-col items-start gap-5 text-gray-600">
            <p className="text-sm/relaxed">
              デバイスの購入金額を使用期間で日割り計算した金額です。
              <br />
              売却済みのデバイスについては、購入金額から売却金額を差し引いた実質負担額を元に計算されます。
            </p>

            <ul className="text-xs/relaxed pb-1.5 relative [&_li]:pl-3.5 [&_li]:before:content-['※'] [&_li]:before:absolute [&_li]:before:top-auto [&_li]:before:left-0">
              <li>
                金額が登録されていない場合は、コスト算出が無効になります。
              </li>
              <li>購入日（または売却日）当日も1日分としてカウントします。</li>
            </ul>
          </div>

          <div className="flex sm:block flex-col w-full sm:w-auto">
            <Button
              onClick={() => setIsOpen(false)}
              className="px-8"
              size="auto"
            >
              閉じる
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DialogFeatureCostToday;
