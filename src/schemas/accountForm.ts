import z from "zod";

const MAX_FILE_SIZE = 3 * 1024 * 1024;

export const accountFormSchema = z.object({
  avatar_url: z.custom<FileList | string>().superRefine((val, ctx) => {
    // 送信するのはファイル URL のみのため、文字列が入っていればバリデーション OK
    if (typeof val === "string") return;

    // FileList でも空の場合はバリデーション OK（選択キャンセルや未選択）
    if (!val || (val instanceof FileList && val.length === 0)) return;

    const file = val[0];

    // サイズチェック
    if (file.size > MAX_FILE_SIZE) {
      ctx.addIssue({
        code: "custom",
        message: "ファイルサイズの上限は 3 MB です。",
      });
    }

    // 形式チェック
    if (!file.type.startsWith("image/")) {
      ctx.addIssue({
        code: "custom",
        message: "画像ファイルを選択してください。",
      });
    }
  }),

  username: z
    .string()
    .min(1, "お名前を入力してください。")
    .max(20, "お名前は 20 文字以内で入力してください。"),
});

export const accountFormEmailSchema = z.object();

export const accountFormPasswordSchema = z.object();
