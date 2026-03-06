import dayjs from "dayjs";
import { z } from "zod";

const emptyToNull = (val: unknown) =>
  val === "" || val === undefined ? null : val;

const priceSchema = z.preprocess(
  emptyToNull,
  z
    .string()
    .regex(/^(0|[1-9]\d*)$/, "正しい数値を入力してください。")
    .max(7, "金額が大きすぎます。")
    .transform(Number)
    .pipe(z.number())
    .nullable(),
);

const dateSchema = z.preprocess(
  emptyToNull,
  z
    .string()
    .refine((val) => {
      const date = dayjs(val);
      return date.isValid() && !date.isAfter(dayjs(), "day");
    }, "未来の日付または無効な日付です。")
    .nullable(),
);

const shortTextSchema = z.preprocess(
  emptyToNull,
  z.string().max(20, "20文字以内で入力してください。").nullable(),
);

const baseDeviceSchema = z
  .object({
    purchase_price: priceSchema,
    purchase_date: dateSchema,
    resale_price: priceSchema,
    retire_date: dateSchema,
    color: shortTextSchema,
    storage: shortTextSchema,

    // デバイスの用途ラジオボタン用ステータス
    // NOTE: 選択されたラジオボタンの value によりメインデバイスとサブ機のフラグを切り替えるために使用
    status: z.enum(["main", "sub", "none"]),
  })
  .superRefine((data, ctx) => {
    const { purchase_date, retire_date } = data;

    if (purchase_date !== null && retire_date !== null) {
      const retireDate = dayjs(retire_date);
      const purchaseDate = dayjs(purchase_date);

      if (!retireDate.isValid() || !purchaseDate.isValid()) {
        ctx.addIssue({
          path: ["retire_date"],
          message: "無効な日付です。",
          code: "custom",
        });
        return;
      }

      if (retireDate.isBefore(purchaseDate, "day")) {
        ctx.addIssue({
          path: ["retire_date"],
          message: "購入日より前の日付は指定できません。",
          code: "custom",
        });
      }
    }
  });

// status を boolean フラグに変換
const deviceSchemaTransform = <T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
) =>
  schema.transform((data) => ({
    ...data,
    is_main: data.status === "main",
    is_sub: data.status === "sub",
  }));

export const registerDeviceSchema = deviceSchemaTransform(baseDeviceSchema);
export const updateDeviceSchema = deviceSchemaTransform(
  baseDeviceSchema.extend({
    device_id: z.string().min(1, "デバイス ID が正しくありません。"),
  }),
);
