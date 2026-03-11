"use client";

import { useRouter } from "next/navigation";
import { useActionState, useTransition } from "react";
import { toast } from "sonner";

import { useFormResultToast } from "@/hooks/useFormResultToast";
import { parseMultipleData } from "@/lib/utils/parseMultipleData";
import { Device } from "@/types";

import { deleteDevice, updateDevice } from "../../../_actions/device";
import DeviceForm from "../../../_components/DeviceForm";
import DeleteDeviceButton from "./DeleteDeviceButton";

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

  const [lastResult, action, isUpdating] = useActionState(
    updateDevice,
    undefined,
  );
  const [isDeleting, startDeleteTransition] = useTransition();

  useFormResultToast(lastResult, { showSuccessToast: false });

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

  const colors = device.colors;
  const storage = device.spec.storage;

  return (
    <>
      <DeviceForm
        initialData={device}
        candidateColors={colors !== "--" ? parseMultipleData(colors) : []}
        candidateStorages={storage !== "--" ? parseMultipleData(storage) : []}
        action={action}
        lastResult={lastResult}
        submitLabel="変更する"
        isPending={isUpdating || isDeleting}
        isAlreadyMainDevice={isAlreadyMainDevice}
        isEditForm
      />

      <div className="mt-9 text-center">
        <DeleteDeviceButton
          onClick={handleDelete}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
        />
      </div>
    </>
  );
};

export default EditDeviceForm;
