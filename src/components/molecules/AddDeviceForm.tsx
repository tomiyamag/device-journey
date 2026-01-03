"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import { registerDevice } from "@/actions/devices";
import Button from "@/components/atoms/Button";
import FormInput from "@/components/atoms/FormInput";
import FormOptionGroup from "@/components/atoms/FormOptionGroup";
import FormRadio from "@/components/atoms/FormRadio";
import FormSubmitButton from "@/components/atoms/FormSubmitButton";
import FormField from "@/components/molecules/FormField";
import { useDeviceDraftStore } from "@/store/useDeviceDraftStore";
import { useDeviceSearchStore } from "@/store/useDeviceSearchStore";
import { DeviceInput } from "@/types";

import ContentLoadingSpinner from "../atoms/ContentLoadingSpinner";

const AddDeviceForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const draft = useDeviceDraftStore((state) => state.draft);
  const { clearDraft } = useDeviceDraftStore();
  const { clearSearch } = useDeviceSearchStore();

  const initialDeviceState: DeviceInput = {
    name: "",
    brand: "",
    purchase_price: "",
    purchase_date: null,
    retire_date: null,
    image_url: null,
    spec: {
      display: "",
      camera: "",
      battery: "",
      weight: "",
      hardware: "",
      storage: "",
    },
    status: null,
    release_date: "",
    colors: "",
    color: "",
    storage: "",
    is_sub: false,
    is_main: false,
  };

  const [formData, setFormData] = useState<DeviceInput>(() => {
    if (draft) {
      return {
        name: draft.name,
        brand: draft.brand,
        purchase_price: draft.purchase_price,
        purchase_date: toDateOrNull(draft.purchase_date),
        retire_date: toDateOrNull(draft.retire_date),
        image_url: draft.image_url,
        spec: {
          display: draft.spec.display,
          camera: draft.spec.camera,
          battery: draft.spec.battery,
          weight: draft.spec.weight,
          hardware: draft.spec.hardware,
          storage: draft.spec.storage,
        },
        status: draft.status,
        release_date: draft.release_date,
        colors: draft.colors,
        color: draft.color,
        storage: draft.storage,
        is_sub: draft.is_sub,
        is_main: draft.is_main,
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

      router.push("/dashboard");

      /**
       * NOTE:
       * clearDraft() の実行で検索画面に遷移するため、フラグを立てて回避（登録完了後はデバイス一覧へ遷移させる）
       */
      setIsSubmitting(true);

      clearDraft();
      clearSearch();
    },
    onError: (err) => {
      console.error(err);
      alert("予期せぬエラーが発生しました");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("DB に保存するデータ: ", { ...formData });
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

  // TODO: 不足している入力欄を追加する
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <FormField htmlFor="name" labelText="機種名">
        <FormInput id="name" value={formData.name} type="text" readOnly />
      </FormField>

      <FormField htmlFor="brand" labelText="ブランド名">
        <FormInput id="brand" value={formData.brand} type="text" readOnly />
      </FormField>

      <FormField htmlFor="release-date" labelText="発売日">
        <FormInput
          id="release-date"
          value={formData.release_date}
          type="text"
          readOnly
        />
      </FormField>

      <FormField
        htmlFor="color"
        labelText="本体カラー"
        description={
          draft.candidate_colors.length > 0
            ? undefined
            : "本体カラー名を入力してください。"
        }
      >
        {draft.candidate_colors.length > 0 ? (
          <FormOptionGroup>
            {draft.candidate_colors.map((color, index) => (
              <Fragment key={index}>
                <FormRadio
                  label={color}
                  id={`color-${color}`}
                  name="color"
                  value={color}
                  checked={formData.color === color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                />
              </Fragment>
            ))}
          </FormOptionGroup>
        ) : (
          <FormInput
            id="color"
            placeholder="Midnight Black"
            value={formData.color}
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
            type="text"
            autoComplete="off"
          />
        )}
      </FormField>

      <FormField
        htmlFor="storage"
        labelText="ストレージ容量"
        description={
          draft.candidate_storages.length > 0
            ? undefined
            : "ストレージ容量を入力してください。"
        }
      >
        {draft.candidate_storages.length > 0 ? (
          <FormOptionGroup>
            {draft.candidate_storages.map((storage, index) => (
              <Fragment key={index}>
                <FormRadio
                  label={storage}
                  id={`storage-${storage}`}
                  name="storage"
                  value={storage}
                  checked={formData.storage === storage}
                  onChange={(e) =>
                    setFormData({ ...formData, storage: e.target.value })
                  }
                />
              </Fragment>
            ))}
          </FormOptionGroup>
        ) : (
          <FormInput
            id="storage"
            placeholder="256GB"
            value={formData.storage}
            onChange={(e) =>
              setFormData({ ...formData, storage: e.target.value })
            }
            type="text"
            autoComplete="off"
          />
        )}
      </FormField>

      <FormField
        labelText="デバイスの用途"
        description={
          formData.is_main
            ? "すでにメインデバイスが設定されている場合は、設定を更新します。"
            : undefined
        }
      >
        <FormOptionGroup>
          <FormRadio
            id="is-status-main"
            label="メインデバイス"
            name="status"
            value="main"
            checked={formData.is_main}
            onChange={() => {
              setFormData({ ...formData, is_main: true, is_sub: false });
            }}
          />
          <FormRadio
            id="is-status-sub"
            label="サブ機"
            name="status"
            value="sub"
            checked={formData.is_sub}
            onChange={() => {
              setFormData({ ...formData, is_main: false, is_sub: true });
            }}
          />
          <FormRadio
            id="is-status-null"
            label="指定しない"
            name="status"
            value="none"
            checked={!formData.is_main && !formData.is_sub}
            onChange={() => {
              setFormData({ ...formData, is_main: false, is_sub: false });
            }}
          />
        </FormOptionGroup>
      </FormField>

      <FormField htmlFor="purchase-price" labelText="購入金額">
        <FormInput
          id="purchase-price"
          value={formData.purchase_price}
          onChange={(e) =>
            setFormData({ ...formData, purchase_price: e.target.value })
          }
          min={0}
          max={9999999}
          maxLength={9999999}
          type="number"
          autoComplete="off"
          placeholder="134800"
        />
      </FormField>

      <FormField htmlFor="purchase-date" labelText="購入日">
        <FormInput
          id="purchase-date"
          value={formData.purchase_date ?? ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              purchase_date: e.target.value || null,
            })
          }
          type="date"
        />
      </FormField>

      <FormField
        htmlFor="retire-date"
        labelText="売却日"
        description="デバイスを売却済みの場合は、売却日を指定してください。"
      >
        <FormInput
          id="retire-date"
          value={formData.retire_date ?? ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              retire_date: e.target.value || null,
            })
          }
          type="date"
        />
      </FormField>

      <div className="flex gap-4 mt-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          disabled={isPending}
        >
          戻る
        </Button>
        <FormSubmitButton loading={isPending}>登録する</FormSubmitButton>
      </div>
    </form>
  );
};

function toDateOrNull(dateStr: string | null) {
  if (!dateStr || dateStr.trim() === "") {
    return null;
  }
  return dateStr;
}

export default AddDeviceForm;
