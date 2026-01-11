"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "sonner";

import { deleteDevice, updateDevice } from "@/actions/devices";
import { useDevice } from "@/hooks/useDevice";
import { DeviceInput } from "@/types";
import { parseMultipleData } from "@/utils/parseMultipleData";

import ContentLoadingSpinner from "../atoms/ContentLoadingSpinner";
import DeviceForm from "../molecules/DeviceForm";

interface IEditDeviceForm {
  id: string;
}

const EditDeviceForm = ({ id }: IEditDeviceForm) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: deviceData, isLoading } = useDevice(id);

  // 更新用 Mutation
  const { mutate: updateMutate, isPending: isUpdating } = useMutation({
    mutationFn: (data: DeviceInput) => updateDevice(id, data),
    onSuccess: async (result) => {
      if (result?.error) {
        toast.error(result.error);
        return;
      }

      // クライアント側のキャッシュを無効化
      await queryClient.invalidateQueries({ queryKey: ["devices"] });

      router.push("/");
      toast.success("デバイス情報を変更しました。");
    },
    onError: (err) => {
      console.error(err);
      toast.error("予期せぬエラーが発生しました。");
    },
  });

  // 削除用 Mutation
  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteDevice(id),
    onSuccess: async (result) => {
      if (result?.error) {
        toast.error(result.error);
        return;
      }

      // クライアント側のキャッシュを無効化
      await queryClient.invalidateQueries({ queryKey: ["devices"] });

      router.push("/devices");
      toast.success("デバイスを削除しました。");
    },
    onError: (err) => {
      console.error(err);
      toast.error("予期せぬエラーが発生しました。");
    },
  });

  const handleUpdate = (data: DeviceInput) => {
    updateMutate(data);
  };

  const handleDelete = () => {
    if (confirm("この操作は取り消せません。\n本当にデバイスを削除しますか？")) {
      deleteMutate();
    }
  };

  if (isLoading) {
    return <ContentLoadingSpinner className="py-8" />;
  }

  if (!deviceData) {
    return null;
  }

  return (
    <>
      <DeviceForm
        initialData={deviceData}
        candidateColors={
          deviceData.colors !== "--" ? parseMultipleData(deviceData.colors) : []
        }
        candidateStorages={
          deviceData.spec.storage !== "--"
            ? parseMultipleData(deviceData.spec.storage)
            : []
        }
        onSubmit={(data) => handleUpdate(data)}
        submitLabel="変更する"
        isPending={isUpdating || isDeleting}
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
