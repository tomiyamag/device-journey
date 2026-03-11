import z from "zod";

const MAX_FILE_SIZE = 3 * 1024 * 1024;

export const accountSchema = z.object({
  username: z
    .string({ error: "名前を入力してください。" })
    .min(1, "名前を入力してください。")
    .max(20, "名前は 20 文字以内で入力してください。"),
  avatar_url: z
    .custom<File | string>()
    .optional()
    .superRefine((val, ctx) => {
      // 未選択または初期値の文字列（URL）の場合は OK
      if (!val || typeof val === "string") return;

      // 選択キャンセル or 未選択時は OK
      if (val.size === 0) return;

      // サイズチェック
      if (val.size > MAX_FILE_SIZE) {
        ctx.addIssue({
          code: "custom",
          message: "ファイルサイズの上限は 3 MB です。",
        });
      }

      // 形式チェック
      if (!val.type.startsWith("image/")) {
        ctx.addIssue({
          code: "custom",
          message: "画像ファイルを選択してください。",
        });
      }
    }),
});
