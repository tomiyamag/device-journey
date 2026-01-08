import { z } from "zod";

export const deviceFormSchema = z.object({
  // 読み取り専用
  name: z.string(),
  brand: z.string(),
  release_date: z.string(),

  // それ以外
  purchase_price: z.coerce
    .string()
    .regex(/^$|^(0|[1-9]\d*)$/, "正しい数値を入力してください。")
    .max(7, "金額が大きすぎます。"),
  purchase_date: z.string(),
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
});
