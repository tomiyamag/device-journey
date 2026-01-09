"use client";

import { usePathname, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { login, signup } from "@/actions/auth";

import FormInput from "../atoms/FormInput";
import FormSubmitButton from "../atoms/FormSubmitButton";
import FormField from "./FormField";

export type AuthType = "login" | "signup";

export interface IAuthForm {
  type: AuthType;
  successMessage?: string;
}

const AuthForm = ({ type, successMessage }: IAuthForm) => {
  const router = useRouter();
  const pathname = usePathname();

  const actionFn = type === "login" ? login : signup;
  const initialFormState = { errorMessage: "" };

  const [formState, formAction] = useActionState(actionFn, initialFormState);

  // エラー
  useEffect(() => {
    if (formState.errorMessage) {
      toast.error(formState.errorMessage);
    }
  }, [formState]);

  // 成功
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        // NOTE: 開発時にトーストが二つ表示されないよう id を指定
        id: "auth-success",
      });

      router.replace(pathname);
    }
  }, [successMessage, router, pathname]);

  return (
    <form action={formAction} className="flex flex-col gap-6 max-w-sm mx-auto">
      <FormField labelText="メールアドレス" htmlFor="email">
        <FormInput
          id="email"
          name="email"
          type="email"
          placeholder="user@example.com"
          required
        />
      </FormField>

      <FormField labelText="パスワード" htmlFor="password">
        <FormInput id="password" name="password" type="password" required />
      </FormField>

      <FormSubmitButton>
        {type === "login" ? "ログイン" : "新規登録"}
      </FormSubmitButton>
    </form>
  );
};

export default AuthForm;
