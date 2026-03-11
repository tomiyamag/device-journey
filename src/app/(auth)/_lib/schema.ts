import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string({ error: "メールアドレスを入力してください。" })
    .min(1, "メールアドレスを入力してください。")
    .pipe(z.email("メールアドレスの形式が正しくありません。")),
  password: z
    .string({ error: "パスワードを入力してください。" })
    .min(1, "パスワードを入力してください。")
    .min(8, "パスワードは 8 文字以上で入力してください。")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).*$/, {
      message: "パスワードは英大文字・小文字・数字・記号を全て含めてください。",
    }),
});
