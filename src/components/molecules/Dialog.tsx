import {
  Dialog as DialogBase,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ReactNode } from "react";

import Button from "../atoms/Button";

interface IDialog {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const Dialog = ({ isOpen, onClose, title, children }: IDialog) => {
  return (
    <DialogBase
      open={isOpen}
      onClose={onClose}
      transition
      className="relative z-50 transition ease-out data-closed:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg flex flex-col gap-5 bg-white/85 backdrop-blur-sm rounded-lg p-8 sm:p-10">
          <DialogTitle className="font-bold">{title}</DialogTitle>

          <div className="text-sm/relaxed">{children}</div>

          <div className="block w-auto ml-auto mr-0">
            <Button
              type="button"
              onClick={onClose}
              className="px-8"
              size="auto"
            >
              閉じる
            </Button>
          </div>
        </DialogPanel>
      </div>
    </DialogBase>
  );
};

export default Dialog;
