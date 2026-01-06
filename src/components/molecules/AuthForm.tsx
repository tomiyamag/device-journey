"use client";

import { useActionState, useEffect } from "react";

import { login, signup } from "@/actions/auth";

import FormInput from "../atoms/FormInput";
import FormSubmitButton from "../atoms/FormSubmitButton";
import FormField from "./FormField";

export type AuthType = "login" | "signup";

export interface IAuthForm {
  type: AuthType;
}

const AuthForm = ({ type }: IAuthForm) => {
  const actionFn = type === "login" ? login : signup;
  const initialFormState = { errorMessage: "" };

  const [formState, formAction] = useActionState(actionFn, initialFormState);

  useEffect(() => {
    if (formState.errorMessage) {
      alert(formState.errorMessage);
    }
  }, [formState]);

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
