"use client";

import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { Fragment } from "react/jsx-runtime";

import { DeviceInput } from "@/types";

import Button from "../atoms/Button";
import FormInput from "../atoms/FormInput";
import FormOptionGroup from "../atoms/FormOptionGroup";
import FormRadio from "../atoms/FormRadio";
import FormField from "./FormField";

interface IDeviceForm {
  formData: DeviceInput;
  setFormData: Dispatch<SetStateAction<DeviceInput>>;
  candidateColors: string[];
  candidateStorages: string[];
  handleSubmit: () => void;
  submitLabel: string;
  isPending: boolean;
}

const DeviceForm = ({
  formData,
  setFormData,
  candidateColors,
  candidateStorages,
  handleSubmit,
  submitLabel,
  isPending,
}: IDeviceForm) => {
  const router = useRouter();

  return (
    <form className="flex flex-col gap-6">
      <FormField htmlFor="name" labelText="機種名">
        <FormInput id="name" value={formData.name} type="text" readOnly />
      </FormField>

      <FormField htmlFor="brand" labelText="ブランド名">
        <FormInput id="brand" value={formData.brand} type="text" readOnly />
      </FormField>

      <FormField htmlFor="release-date" labelText="発売日">
        <FormInput
          id="release-date"
          value={formData.release_date ?? ""}
          type="text"
          readOnly
        />
      </FormField>

      <FormField
        htmlFor="color"
        labelText="本体カラー"
        description={
          candidateColors.length > 0
            ? undefined
            : "本体カラー名を入力してください。"
        }
      >
        {candidateColors.length > 0 ? (
          <FormOptionGroup>
            {candidateColors.map((color, index) => (
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
                  disabled={isPending}
                />
              </Fragment>
            ))}
          </FormOptionGroup>
        ) : (
          <FormInput
            id="color"
            placeholder="Midnight Black"
            value={formData.color ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
            type="text"
            autoComplete="off"
            disabled={isPending}
          />
        )}
      </FormField>

      <FormField
        htmlFor="storage"
        labelText="ストレージ容量"
        description={
          candidateStorages.length > 0
            ? undefined
            : "ストレージ容量を入力してください。"
        }
      >
        {candidateStorages.length > 0 ? (
          <FormOptionGroup>
            {candidateStorages.map((storage, index) => (
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
                  disabled={isPending}
                />
              </Fragment>
            ))}
          </FormOptionGroup>
        ) : (
          <FormInput
            id="storage"
            placeholder="256GB"
            value={formData.storage ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, storage: e.target.value })
            }
            type="text"
            autoComplete="off"
            disabled={isPending}
          />
        )}
      </FormField>

      <FormField
        labelText="デバイスの用途"
        description={
          formData.is_main
            ? "すでにメインデバイスを登録済みの場合は設定を更新します。"
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
            disabled={!!formData.retire_date || isPending}
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
            disabled={!!formData.retire_date || isPending}
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
            disabled={isPending}
            onChange={() => {
              setFormData({ ...formData, is_main: false, is_sub: false });
            }}
          />
        </FormOptionGroup>
      </FormField>

      <FormField htmlFor="purchase-date" labelText="購入日">
        <FormInput
          id="purchase-date"
          value={formData.purchase_date ?? ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              purchase_date: e.target.value,
            })
          }
          max={dayjs().format("YYYY-MM-DD")}
          type="date"
          disabled={isPending}
        />
      </FormField>

      <FormField htmlFor="purchase-price" labelText="購入金額">
        <FormInput
          id="purchase-price"
          value={formData.purchase_price ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, purchase_price: e.target.value })
          }
          min={0}
          max={9999999}
          type="number"
          autoComplete="off"
          placeholder="159800"
          disabled={isPending}
        />
      </FormField>

      {!formData.is_main && !formData.is_sub && (
        <>
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
                  retire_date: e.target.value,
                  resale_price: !e.target.value ? "" : formData.resale_price,
                })
              }
              max={dayjs().format("YYYY-MM-DD")}
              type="date"
              disabled={isPending}
            />
          </FormField>

          {!!formData.retire_date && (
            <FormField htmlFor="sold-price" labelText="売却金額">
              <FormInput
                id="sold-price"
                value={formData.resale_price ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, resale_price: e.target.value })
                }
                min={0}
                max={9999999}
                type="number"
                autoComplete="off"
                placeholder="65000"
                disabled={isPending}
              />
            </FormField>
          )}
        </>
      )}

      <div className="flex flex-col-reverse sm:flex-row gap-6 sm:gap-4 mt-3">
        <Button
          type="button"
          variant="back"
          onClick={() => router.back()}
          disabled={isPending}
        >
          戻る
        </Button>
        <Button type="button" loading={isPending} onClick={handleSubmit}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default DeviceForm;
