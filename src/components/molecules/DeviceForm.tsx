"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useMemo } from "react";
import { Fragment } from "react/jsx-runtime";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { useDevices } from "@/hooks/useDevices";
import { deviceFormSchema } from "@/schemas/deviceForm";
import { Device, DeviceInput, DeviceInputDraft } from "@/types";

import Button from "../atoms/Button";
import FormInput from "../atoms/FormInput";
import FormOptionGroup from "../atoms/FormOptionGroup";
import FormRadio from "../atoms/FormRadio";
import FormField from "./FormField";

interface IDeviceForm {
  initialData: DeviceInputDraft | Device;
  candidateColors: string[];
  candidateStorages: string[];
  onSubmit: (data: DeviceInput) => void;
  submitLabel: string;
  isPending: boolean;
}

type DeviceSchemaType = z.input<typeof deviceFormSchema>;

// デバイス用途の説明テキスト出し分け
const deviceStatusDescription = (
  initialData: DeviceInputDraft | Device,
  selectedMainDevice: boolean,
  isAlreadyMainDevice: boolean | undefined,
  isRetired: boolean,
): string | ReactNode | undefined => {
  // メインデバイス未登録＆売却日を指定していない場合
  if (!isAlreadyMainDevice && !isRetired) {
    return "メインデバイスが未登録です。この端末を登録しませんか？";
  }

  // 別のデバイスをメインデバイスにする場合
  if (isAlreadyMainDevice && selectedMainDevice && !initialData.is_main) {
    return "現在登録されているメインデバイス設定が上書きされます。";
  }

  // 売却日の指定を行った場合
  if (isRetired && !selectedMainDevice) {
    return "変更する場合は、指定した売却日を削除またはリセットしてください。";
  }

  return undefined;
};

const DeviceForm = ({
  initialData,
  candidateColors,
  candidateStorages,
  onSubmit,
  submitLabel,
  isPending,
}: IDeviceForm) => {
  const router = useRouter();
  const { data: devices } = useDevices();

  // 初期値の生成
  const defaultValues = useMemo<DeviceSchemaType>(() => {
    return {
      // 読み取り専用
      name: initialData.name,
      brand: initialData.brand,
      release_date: initialData.release_date,

      // それ以外
      purchase_price: initialData.purchase_price ?? "",
      purchase_date: initialData.purchase_date ?? "",
      retire_date: initialData.retire_date ?? "",
      color: initialData.color ?? "",
      storage: initialData.storage ?? "",
      resale_price: initialData.resale_price ?? "",

      // デバイスの用途フラグを status 文字列に変換
      status: initialData.is_main
        ? "main"
        : initialData.is_sub
          ? "sub"
          : "none",
    } as DeviceSchemaType;
  }, [initialData]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DeviceSchemaType>({
    resolver: zodResolver(deviceFormSchema),
    defaultValues,
  });

  // UI 制御用
  const status = useWatch({ control, name: "status" });
  const retireDate = useWatch({ control, name: "retire_date" });
  const purchaseDate = useWatch({ control, name: "purchase_date" });
  const isActiveDevice = status === "main" || status === "sub";
  const isRetired = !!retireDate;
  const isAlreadyMainDevice =
    devices && devices.filter((device) => device.is_main).length > 0;

  // 売却日が削除された場合は売却金額を空にする
  useEffect(() => {
    if (!retireDate) {
      setValue("resale_price", "");
    }
  }, [retireDate, setValue]);

  const handleFormSubmit = (data: DeviceSchemaType) => {
    /**
     * NOTE: status, candidate_colors, candidate_storages はデータとして送信しないため、それら以外を rest として取得
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { candidate_colors, candidate_storages, ...restInitialData } =
      (initialData as DeviceInputDraft) || {};

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { status: _status, ...restData } = data;

    // 送信するフォームデータを DeviceInput 型に戻す
    const submitData: DeviceInput = {
      ...restInitialData,
      ...restData,

      // 金額を数値に変換
      purchase_price:
        data.purchase_price !== "" ? Number(data.purchase_price) : null,
      resale_price: data.resale_price !== "" ? Number(data.resale_price) : null,

      // 空文字を null に変換
      purchase_date: data.purchase_date || null,
      retire_date: data.retire_date || null,
      color: data.color || null,
      storage: data.storage || null,

      // status を boolean フラグに変換
      is_main: data.status === "main",
      is_sub: data.status === "sub",
    } as DeviceInput;

    onSubmit(submitData);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6">
      <FormField
        htmlFor="name"
        labelText="機種名"
        description="機種名は変更できません。"
      >
        <FormInput id="name" type="text" readOnly {...register("name")} />
      </FormField>

      <FormField
        htmlFor="brand"
        labelText="ブランド名"
        description="ブランド名は変更できません。"
      >
        <FormInput id="brand" type="text" readOnly {...register("brand")} />
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
          {...register("release_date")}
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
        error={errors?.color?.message}
      >
        {candidateColors.length > 0 ? (
          <FormOptionGroup>
            {candidateColors.map((color, index) => (
              <Fragment key={index}>
                <FormRadio
                  label={color}
                  id={`color-${color}`}
                  value={color}
                  disabled={isPending}
                  {...register("color")}
                />
              </Fragment>
            ))}
          </FormOptionGroup>
        ) : (
          <FormInput
            id="color"
            placeholder="Midnight Black"
            type="text"
            autoComplete="off"
            disabled={isPending}
            {...register("color")}
            isError={!!errors.color}
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
        error={errors?.storage?.message}
      >
        {candidateStorages.length > 0 ? (
          <FormOptionGroup>
            {candidateStorages.map((storage, index) => (
              <Fragment key={index}>
                <FormRadio
                  label={storage}
                  id={`storage-${storage}`}
                  value={storage}
                  disabled={isPending}
                  {...register("storage")}
                />
              </Fragment>
            ))}
          </FormOptionGroup>
        ) : (
          <FormInput
            id="storage"
            placeholder="256GB"
            type="text"
            autoComplete="off"
            disabled={isPending}
            {...register("storage")}
            isError={!!errors.storage}
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
            id="is-status-main"
            label="メインデバイス"
            value="main"
            disabled={isRetired || isPending}
            {...register("status")}
          />
          <FormRadio
            id="is-status-sub"
            label="サブ機"
            value="sub"
            disabled={isRetired || isPending}
            {...register("status")}
          />
          <FormRadio
            id="is-status-null"
            label="指定しない"
            value="none"
            disabled={isPending}
            {...register("status")}
          />
        </FormOptionGroup>
      </FormField>

      <FormField
        htmlFor="purchase-date"
        labelText="購入日"
        error={errors?.purchase_date?.message}
      >
        <FormInput
          id="purchase-date"
          max={dayjs().format("YYYY-MM-DD")}
          type="date"
          disabled={isPending}
          {...register("purchase_date")}
          isError={!!errors.purchase_date}
        />
      </FormField>

      <FormField
        htmlFor="purchase-price"
        labelText="購入金額"
        error={errors?.purchase_price?.message}
      >
        <div className="flex items-center gap-2">
          <span>¥</span>
          <FormInput
            id="purchase-price"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="off"
            placeholder="159800"
            disabled={isPending}
            {...register("purchase_price")}
            isError={!!errors.purchase_price}
          />
        </div>
      </FormField>

      {!isActiveDevice && (
        <>
          <FormField
            htmlFor="retire-date"
            labelText="売却日"
            description="デバイスを売却済みの場合は、売却日を指定してください。"
            error={errors?.retire_date?.message}
          >
            <FormInput
              id="retire-date"
              min={purchaseDate || undefined}
              max={dayjs().format("YYYY-MM-DD")}
              type="date"
              disabled={isPending}
              {...register("retire_date")}
              isError={!!errors.retire_date}
            />
          </FormField>

          {isRetired && (
            <FormField
              htmlFor="sold-price"
              labelText="売却金額"
              error={errors?.resale_price?.message}
            >
              <div className="flex items-center gap-2">
                <span>¥</span>
                <FormInput
                  id="sold-price"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="off"
                  placeholder="65000"
                  disabled={isPending}
                  {...register("resale_price")}
                  isError={!!errors.resale_price}
                />
              </div>
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
        <Button
          type="button"
          onClick={handleSubmit(handleFormSubmit)}
          loading={isPending}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default DeviceForm;
