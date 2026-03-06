"use client";

import { FaRegTrashCan } from "react-icons/fa6";

interface IDeleteDeviceButton {
  onClick: () => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

const DeleteDeviceButton = ({
  onClick,
  isUpdating,
  isDeleting,
}: IDeleteDeviceButton) => {
  return (
    <button
      type="button"
      className="group inline-block cursor-pointer transition-opacity hover:opacity-80 disabled:cursor-auto disabled:text-gray-400 disabled:opacity-100"
      onClick={onClick}
      disabled={isUpdating || isDeleting}
    >
      <div className="inline-flex items-center gap-1.5 text-sm underline group-hover:no-underline group-disabled:no-underline">
        {isDeleting ? (
          <>
            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-300 border-t-transparent"></div>
            <span>デバイスを削除しています...</span>
          </>
        ) : (
          <>
            <FaRegTrashCan />
            <span>デバイスを削除する</span>
          </>
        )}
      </div>
    </button>
  );
};

export default DeleteDeviceButton;
