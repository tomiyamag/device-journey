import { z } from "zod";

import {
  passwordConfirmationSchema,
  passwordSchema,
} from "@/lib/schemas/password";

export const authSchema = z.object({
  email: z
    .string({ error: "メールアドレスを入力してください。" })
    .min(1, "メールアドレスを入力してください。")
    .pipe(z.email("メールアドレスの形式が正しくありません。")),
  password: passwordSchema,
});

export const signupSchema = authSchema
  .extend({
    password_confirmation: passwordConfirmationSchema,
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "パスワードが一致しません。",
  });
