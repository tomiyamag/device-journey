"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { registerDevice } from "@/actions/devices";
import { useDeviceDraftStore } from "@/store/useDeviceDraftStore";
import { useDeviceSearchStore } from "@/store/useDeviceSearchStore";
import { DeviceInput } from "@/types";

import ContentLoadingSpinner from "../atoms/ContentLoadingSpinner";
import DeviceForm from "../molecules/DeviceForm";

export const initialDeviceState: DeviceInput = {
  name: "",
  brand: "",
  purchase_price: "",
  purchase_date: "",
  retire_date: "",
  image_url: "",
  spec: {
    display: "",
    camera: "",
    battery: "",
    weight: "",
    hardware: "",
    storage: "",
  },
  release_date: "",
  colors: "",
  color: "",
  storage: "",
  is_sub: false,
  is_main: false,
  resale_price: "",
};

const AddDeviceForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const draft = useDeviceDraftStore((state) => state.draft);
  const { clearDraft } = useDeviceDraftStore();
  const { clearSearch } = useDeviceSearchStore();

  const [formData, setFormData] = useState<DeviceInput>(() => {
    if (draft) {
      return {
        name: draft.name,
        brand: draft.brand,
        purchase_price: draft.purchase_price,
        purchase_date: draft.purchase_date,
        retire_date: draft.retire_date,
        image_url: draft.image_url,
        spec: {
          display: draft.spec.display,
          camera: draft.spec.camera,
          battery: draft.spec.battery,
          weight: draft.spec.weight,
          hardware: draft.spec.hardware,
          storage: draft.spec.storage,
        },
        release_date: draft.release_date,
        colors: draft.colors,
        color: draft.color,
        storage: draft.storage,
        is_sub: draft.is_sub,
        is_main: draft.is_main,
        resale_price: draft.resale_price,
      };
    }

    return initialDeviceState;
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: DeviceInput) => registerDevice(data),
    onSuccess: async (result) => {
      if (result?.error) {
        alert(result.error);
        return;
      }

      alert("デバイスを登録しました");

      // クライアント側のキャッシュを無効化
      await queryClient.invalidateQueries({ queryKey: ["devices"] });

      /**
       * NOTE:
       * clearDraft() の実行で検索画面に遷移するため、フラグを立てて回避（登録完了後はデバイス管理へ遷移させる）
       */
      setIsSubmitting(true);

      router.push("/dashboard");

      clearDraft();
      clearSearch();
    },
    onError: (err) => {
      console.error(err);
      alert("予期せぬエラーが発生しました");
    },
  });

  const handleSubmit = () => {
    mutate(formData);
  };

  useEffect(() => {
    if (!draft && !isSubmitting) {
      router.push("/devices/search");
    }
  }, [draft, isSubmitting, router]);

  if (!draft) {
    return <ContentLoadingSpinner className="py-8" />;
  }

  return (
    <DeviceForm
      formData={formData}
      setFormData={setFormData}
      candidateColors={draft.candidate_colors}
      candidateStorages={draft.candidate_storages}
      handleSubmit={handleSubmit}
      submitLabel="登録する"
      isPending={isPending}
    />
  );
};

export default AddDeviceForm;
