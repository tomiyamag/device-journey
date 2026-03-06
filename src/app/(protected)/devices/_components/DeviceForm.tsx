"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { Fragment } from "react/jsx-runtime";

import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import FormInput from "@/components/ui/FormInput";
import FormOptionGroup from "@/components/ui/FormOptionGroup";
import FormRadio from "@/components/ui/FormRadio";
import { Device } from "@/types";

import { registerDeviceSchema, updateDeviceSchema } from "../_lib/schema";
import { deviceStatusDescription } from "../_lib/utils";
import { DeviceFormState, DeviceInputDraft } from "../_types";
import { useHoldWhilePending } from "../hooks/useHoldWhilePending";

interface IDeviceForm {
  initialData: DeviceInputDraft | Device;
  candidateColors: string[];
  candidateStorages: string[];
  action: (payload: FormData) => void;
  lastResult: DeviceFormState;
  submitLabel: string;
  isPending: boolean;
  isAlreadyMainDevice: boolean;
  isEditForm?: boolean;
}

const DeviceForm = ({
  initialData,
  candidateColors,
  candidateStorages,
  action,
  lastResult,
  submitLabel,
  isPending,
  isAlreadyMainDevice,
  isEditForm = false,
}: IDeviceForm) => {
  const router = useRouter();

  const schema = isEditForm ? updateDeviceSchema : registerDeviceSchema;

  // 初期値
  const defaultValue = {
    purchase_price: initialData.purchase_price ?? "",
    purchase_date: initialData.purchase_date ?? "",
    retire_date: initialData.retire_date ?? "",
    color: initialData.color ?? "",
    storage: initialData.storage ?? "",
    resale_price: initialData.resale_price ?? "",

    // デバイスの用途フラグを status 文字列に変換
    status: initialData.is_main ? "main" : initialData.is_sub ? "sub" : "none",
  };

  const [form, fields] = useForm({
    lastResult,
    defaultValue,
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  const status = useHoldWhilePending(fields.status.value, isPending);
  const retireDate = useHoldWhilePending(fields.retire_date.value, isPending);
  const purchaseDate = fields.purchase_date.value;
  const isActiveDevice = status === "main" || status === "sub";
  const isRetired = !!retireDate;

  return (
    <form
      key={form.id}
      className="flex flex-col gap-6"
      action={action}
      {...getFormProps(form)}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
    >
      <FormField
        htmlFor="name"
        labelText="機種名"
        description="機種名は変更できません。"
      >
        <FormInput
          id="name"
          type="text"
          readOnly
          defaultValue={initialData.name}
        />
      </FormField>

      <FormField
        htmlFor="brand"
        labelText="ブランド名"
        description="ブランド名は変更できません。"
      >
        <FormInput
          id="brand"
          type="text"
          readOnly
          defaultValue={initialData.brand}
        />
      </FormField>

      <FormField
        htmlFor="release-date"
        labelText="発売日"
        description="発売日は変更できません。"
      >
        <FormInput
          id="release-date"
          type="text"
          readOnly
          defaultValue={initialData.release_date as string}
        />
      </FormField>

      <FormField
        htmlFor={fields.color.id}
        labelText="本体カラー"
        description={
          candidateColors.length > 0
            ? undefined
            : "本体カラー名を入力してください。"
        }
        error={fields.color.errors?.[0]}
      >
        {candidateColors.length > 0 ? (
          <FormOptionGroup>
            {candidateColors.map((color, index) => (
              <Fragment key={index}>
                <FormRadio
                  label={color}
                  disabled={isPending}
                  {...getInputProps(fields.color, {
                    type: "radio",
                    value: color,
                  })}
                  id={`${fields.color.id}-${index}`}
                />
              </Fragment>
            ))}
          </FormOptionGroup>
        ) : (
          <FormInput
            placeholder="Midnight Black"
            autoComplete="off"
            disabled={isPending}
            {...getInputProps(fields.color, { type: "text" })}
            isError={!!fields.color.errors}
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
        error={fields.storage.errors?.[0]}
      >
        {candidateStorages.length > 0 ? (
          <FormOptionGroup>
            {candidateStorages.map((storage, index) => (
              <Fragment key={index}>
                <FormRadio
                  label={storage}
                  disabled={isPending}
                  {...getInputProps(fields.storage, {
                    type: "radio",
                    value: storage,
                  })}
                  id={`${fields.storage.id}-${index}`}
                />
              </Fragment>
            ))}
          </FormOptionGroup>
        ) : (
          <FormInput
            placeholder="256GB"
            autoComplete="off"
            disabled={isPending}
            {...getInputProps(fields.storage, { type: "text" })}
            isError={!!fields.storage.errors}
          />
        )}
      </FormField>

      <FormField
        labelText="デバイスの用途"
        description={deviceStatusDescription(
          initialData,
          status === "main",
          isAlreadyMainDevice,
          isRetired,
        )}
      >
        <FormOptionGroup>
          <FormRadio
            label="メインデバイス"
            disabled={isRetired || isPending}
            {...getInputProps(fields.status, { type: "radio", value: "main" })}
            id="is-status-main"
          />
          <FormRadio
            label="サブ機"
            disabled={isRetired || isPending}
            {...getInputProps(fields.status, { type: "radio", value: "sub" })}
            id="is-status-sub"
          />
          <FormRadio
            label="指定しない"
            disabled={isRetired || isPending}
            {...getInputProps(fields.status, { type: "radio", value: "none" })}
            id="is-status-none"
          />
        </FormOptionGroup>

        {(isRetired || isPending) && (
          <input
            type="hidden"
            name={fields.status.name}
            value={fields.status.value}
          />
        )}
      </FormField>

      <FormField
        htmlFor="purchase-date"
        labelText="購入日"
        error={fields.purchase_date.errors?.[0]}
      >
        <FormInput
          max={dayjs().format("YYYY-MM-DD")}
          disabled={isPending}
          {...getInputProps(fields.purchase_date, { type: "date" })}
          isError={!!fields.purchase_date.errors}
        />
      </FormField>

      <FormField
        htmlFor="purchase-price"
        labelText="購入金額"
        error={fields.purchase_price.errors?.[0]}
      >
        <div className="flex items-center gap-2">
          <span>¥</span>
          <FormInput
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            placeholder="159800"
            disabled={isPending}
            {...getInputProps(fields.purchase_price, { type: "text" })}
            isError={!!fields.purchase_price.errors}
          />
        </div>
      </FormField>

      {!isActiveDevice && (
        <>
          <FormField
            htmlFor="retire-date"
            labelText="売却日"
            description="デバイスを売却済みの場合は、売却日を指定してください。"
            error={fields.retire_date.errors?.[0]}
          >
            <FormInput
              min={purchaseDate || undefined}
              max={dayjs().format("YYYY-MM-DD")}
              disabled={isPending}
              {...getInputProps(fields.retire_date, { type: "date" })}
              isError={!!fields.retire_date.errors}
            />
          </FormField>

          {isRetired && (
            <FormField
              htmlFor="sold-price"
              labelText="売却金額"
              error={fields.resale_price.errors?.[0]}
            >
              <div className="flex items-center gap-2">
                <span>¥</span>
                <FormInput
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="off"
                  placeholder="65000"
                  disabled={isPending}
                  {...getInputProps(fields.resale_price, { type: "text" })}
                  isError={!!fields.resale_price.errors}
                />
              </div>
            </FormField>
          )}
        </>
      )}

      {isEditForm && (
        <input type="hidden" name="device_id" value={initialData.id} />
      )}

      <div className="flex flex-col-reverse sm:flex-row gap-6 sm:gap-4 mt-3">
        <Button
          type="button"
          variant="back"
          onClick={() => {
            form.reset();
            router.back();
          }}
          disabled={isPending}
        >
          戻る
        </Button>
        <Button
          type="submit"
          loading={isPending}
          disabled={isEditForm && !form.dirty}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default DeviceForm;
