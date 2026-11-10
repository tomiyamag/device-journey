import z from "zod";

// NOTE: パスワードの文字ルールは新規登録とパスワード変更で共通
export const passwordSchema = z
  .string({ error: "パスワードを入力してください。" })
  .min(1, "パスワードを入力してください。")
  .min(8, "パスワードは 8 文字以上で入力してください。")
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).*$/, {
    message: "パスワードは英大文字・小文字・数字・記号を全て含めてください。",
  });

export const passwordConfirmationSchema = z
  .string({ error: "パスワード（確認用）を入力してください。" })
  .min(1, "パスワード（確認用）を入力してください。");
