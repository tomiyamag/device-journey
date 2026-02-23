"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import Spinner from "@/components/ui/Spinner";

import { registerDevice } from "../../_actions/device";
import DeviceForm from "../../_components/DeviceForm";
import { useDeviceDraftStore } from "../../_stores/useDeviceDraftStore";
import { useDeviceSearchStore } from "../../_stores/useDeviceSearchStore";
import { DeviceInput } from "../../_types";

interface IAddDeviceFrom {
  isAlreadyMainDevice: boolean;
}

const AddDeviceForm = ({ isAlreadyMainDevice }: IAddDeviceFrom) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const draft = useDeviceDraftStore((state) => state.draft);
  const { clearDraft } = useDeviceDraftStore();
  const { clearSearch } = useDeviceSearchStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: DeviceInput) => registerDevice(data),
    onSuccess: async (result) => {
      if (result?.error) {
        toast.error(result.error);
        return;
      }

      // クライアント側のキャッシュを無効化
      await queryClient.invalidateQueries({ queryKey: ["devices"] });

      /**
       * NOTE:
       * clearDraft() の実行で検索画面に遷移するため、フラグを立てて回避（登録完了後はホームへ遷移させる）
       */
      setIsSubmitting(true);

      clearDraft();
      clearSearch();

      router.push("/");
      toast.success("デバイスを登録しました。");
    },
    onError: (err) => {
      console.error(err);
      toast.error("予期せぬエラーが発生しました");
    },
  });

  useEffect(() => {
    if (!draft && !isSubmitting) {
      router.push("/devices/search");
    }
  }, [draft, isSubmitting, router]);

  if (!draft) {
    return <Spinner className="py-8" />;
  }

  const handleSubmit = (data: DeviceInput) => {
    mutate(data);
  };

  return (
    <DeviceForm
      initialData={draft}
      candidateColors={draft.candidate_colors}
      candidateStorages={draft.candidate_storages}
      onSubmit={(data) => handleSubmit(data)}
      submitLabel="登録する"
      isPending={isPending}
      isAlreadyMainDevice={isAlreadyMainDevice}
    />
  );
};

export default AddDeviceForm;
