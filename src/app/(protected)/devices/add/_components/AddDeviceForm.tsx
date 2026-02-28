"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
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

  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const draft = useDeviceDraftStore((state) => state.draft);
  const { clearDraft } = useDeviceDraftStore();
  const { clearSearch } = useDeviceSearchStore();

  useEffect(() => {
    if (!draft && !isSubmitting) {
      router.push("/devices/search");
    }
  }, [draft, isSubmitting, router]);

  if (!draft) {
    return <Spinner className="py-8" />;
  }

  const handleSubmit = (data: DeviceInput) => {
    startTransition(async () => {
      try {
        const result = await registerDevice(data);

        if (result?.error) {
          toast.error(result.error);
          return;
        }

        /**
         * NOTE:
         * clearDraft() の実行で検索画面に遷移するため、フラグを立てて回避（登録完了後はデバイス一覧へ遷移させる）
         */
        setIsSubmitting(true);

        clearDraft();
        clearSearch();

        toast.success("デバイスを登録しました。");
        router.push("/devices");
      } catch (err) {
        console.error(err);
        toast.error("予期せぬエラーが発生しました");
      }
    });
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
