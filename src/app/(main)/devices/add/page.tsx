"use client";

import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import Button from "@/components/atoms/Button";
import FormInput from "@/components/atoms/FormInput";
import FormRadio from "@/components/atoms/FormRadio";
import FormRadioGroup from "@/components/atoms/FormRadioGroup";
import FormSubmitButton from "@/components/atoms/FormSubmitButton";
import PageHeading from "@/components/atoms/PageHeading";
import FormField from "@/components/molecules/FormField";
import { useDeviceDraftStore } from "@/store/useDeviceDraftStore";
import { Device } from "@/types";

export default function DeviceAddPage() {
  const router = useRouter();
  const draft = useDeviceDraftStore((state) => state.draft);

  const initialDeviceState: Device = {
    name: "",
    brand: "",
    purchase_price: "null",
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
    status: null,
    release_date: "",
    colors: "",
    color: "",
    storage: "",
    is_new: false,
    is_main: false,
  };

  const [formData, setFormData] = useState<Device>(() => {
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
        status: draft.status,
        release_date: draft.release_date,
        colors: draft.colors,
        color: draft.color,
        storage: draft.storage,
        is_new: draft.is_new,
        is_main: draft.is_main,
      };
    }

    return initialDeviceState;
  });

  useEffect(() => {
    if (!draft) {
      router.push("/devices/search");
    }
  }, [draft, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("DB に保存するデータ: ", { ...formData });

    // TODO: セーブ
    alert("保存しました（コンソール確認）");
  };

  if (!draft) return null;

  // TODO: 不足している入力欄を追加する
  return (
    <section>
      <PageHeading label="端末情報の登録" />

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
              : "使用中の本体カラー名を入力してください。"
          }
        >
          {draft.candidate_colors.length > 0 ? (
            <FormRadioGroup>
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
            </FormRadioGroup>
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
              : "使用中のストレージ容量を入力してください。"
          }
        >
          {draft.candidate_storages.length > 0 ? (
            <FormRadioGroup>
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
            </FormRadioGroup>
          ) : (
            <FormInput
              id="storage"
              placeholder="256 GB"
              value={formData.storage}
              onChange={(e) =>
                setFormData({ ...formData, storage: e.target.value })
              }
              type="text"
              autoComplete="off"
            />
          )}
        </FormField>

        <FormField htmlFor="purchase-price" labelText="購入金額">
          <FormInput
            id="purchase-price"
            value={formData.purchase_price}
            onChange={(e) =>
              setFormData({ ...formData, purchase_price: e.target.value })
            }
            min={0}
            type="number"
            autoComplete="off"
            placeholder="134800"
          />
        </FormField>

        <FormField htmlFor="purchase-date" labelText="購入日">
          <FormInput
            id="purchase-date"
            value={formData.purchase_date}
            onChange={(e) =>
              setFormData({ ...formData, purchase_date: e.target.value })
            }
            type="date"
          />
        </FormField>

        <FormField
          htmlFor="retire-date"
          labelText="売却日"
          description="すでに端末を売却済みの場合は、売却日を指定してください。"
        >
          <FormInput
            id="retire-date"
            value={formData.retire_date}
            onChange={(e) =>
              setFormData({ ...formData, retire_date: e.target.value })
            }
            type="date"
          />
        </FormField>

        <div className="flex gap-4 mt-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            戻る
          </Button>
          <FormSubmitButton>登録する</FormSubmitButton>
        </div>
      </form>
    </section>
  );
}
