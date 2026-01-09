import { z } from "zod";

export const authFormSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください。")
    .email("メールアドレスの形式が正しくありません。"),
  password: z
    .string()
    .min(1, "パスワードを入力してください。")
    .min(8, "パスワードは8文字以上で入力してください。")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).*$/, {
      message: "パスワードは英大文字・小文字・数字・記号を全て含めてください。",
    }),
});
