"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "sonner";

import { parseMultipleData } from "@/lib/utils/parseMultipleData";
import { Device } from "@/types";

import { deleteDevice, updateDevice } from "../../../_actions/device";
import DeviceForm from "../../../_components/DeviceForm";
import { DeviceInput } from "../../../_types";

interface IEditDeviceForm {
  device: Device;
  id: string;
  isAlreadyMainDevice: boolean;
}

const EditDeviceForm = ({
  device,
  id,
  isAlreadyMainDevice,
}: IEditDeviceForm) => {
  const router = useRouter();

  const [isUpdating, startUpdateTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();

  const handleUpdate = (data: DeviceInput) => {
    startUpdateTransition(async () => {
      try {
        const result = await updateDevice(id, data);

        if (result?.error) {
          toast.error(result.error);
          return;
        }

        toast.success("デバイス情報を変更しました。");
        router.push(`/devices/${id}`);
      } catch (err) {
        console.error(err);
        toast.error("予期せぬエラーが発生しました。");
      }
    });
  };

  const handleDelete = () => {
    if (confirm("この操作は取り消せません。\n本当にデバイスを削除しますか？")) {
      startDeleteTransition(async () => {
        try {
          const result = await deleteDevice(id);

          if (result?.error) {
            toast.error(result.error);
            return;
          }

          toast.success("デバイスを削除しました。");
          router.push("/devices");
        } catch (err) {
          console.error(err);
          toast.error("予期せぬエラーが発生しました。");
        }
      });
    }
  };

  return (
    <>
      <DeviceForm
        initialData={device}
        candidateColors={
          device.colors !== "--" ? parseMultipleData(device.colors) : []
        }
        candidateStorages={
          device.spec.storage !== "--"
            ? parseMultipleData(device.spec.storage)
            : []
        }
        onSubmit={(data) => handleUpdate(data)}
        submitLabel="変更する"
        isPending={isUpdating || isDeleting}
        isEdit
        isAlreadyMainDevice={isAlreadyMainDevice}
      />

      <div className="mt-9 text-center">
        <button
          type="button"
          className="group inline-block cursor-pointer transition-opacity hover:opacity-80 disabled:cursor-auto disabled:text-gray-400 disabled:opacity-100"
          onClick={handleDelete}
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
      </div>
    </>
  );
};

export default EditDeviceForm;
