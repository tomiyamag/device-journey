import dayjs from "dayjs";
import { z } from "zod";

export const deviceFormSchema = z
  .object({
    // 読み取り専用
    name: z.string(),
    brand: z.string(),
    release_date: z.string(),

    // それ以外
    purchase_price: z.coerce
      .string()
      .regex(/^$|^(0|[1-9]\d*)$/, "正しい数値を入力してください。")
      .max(7, "金額が大きすぎます。"),
    purchase_date: z.string().refine((val) => {
      if (!val) return true;
      return !dayjs(val).isAfter(dayjs(), "day");
    }, "未来の日付は選択できません。"),
    retire_date: z.string(),
    color: z.string().max(20, "20 文字以内で入力してください。"),
    storage: z.string().max(20, "20 文字以内で入力してください。"),
    resale_price: z.coerce
      .string()
      .regex(/^$|^(0|[1-9]\d*)$/, "正しい数値を入力してください。")
      .max(7, "金額が大きすぎます。"),

    // デバイスの用途ラジオボタン用ステータス
    // NOTE: 選択されたラジオボタンの value によりメインデバイスとサブ機のフラグを切り替えるために使用
    status: z.enum(["main", "sub", "none"]),
  })
  .superRefine((data, ctx) => {
    const { purchase_date, retire_date } = data;

    if (!retire_date) return;

    const retire = dayjs(retire_date);

    if (retire.isAfter(dayjs(), "day")) {
      ctx.addIssue({
        path: ["retire_date"],
        message: "未来の日付は選択できません。",
        code: "custom",
      });
    }

    if (purchase_date) {
      const purchase = dayjs(purchase_date);

      if (retire.isBefore(purchase, "day")) {
        ctx.addIssue({
          path: ["retire_date"],
          message: "購入日より前の日付は選択できません。",
          code: "custom",
        });
      }
    }
  });
