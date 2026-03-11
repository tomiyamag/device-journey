"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { usePathname, useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import z from "zod";

import { login, signup } from "@/actions/auth";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import FormInput from "@/components/ui/FormInput";
import FormPassword from "@/components/ui/FormPassword";
import { useFormResultToast } from "@/hooks/useFormResultToast";

import { authSchema } from "../_lib/schema";

export type AuthType = "login" | "signup";

export interface IAuthForm {
  type: AuthType;
  successMessage?: string;
}

type AuthSchemaType = z.input<typeof authSchema>;

const AuthForm = ({ type, successMessage }: IAuthForm) => {
  const router = useRouter();
  const pathname = usePathname();

  const actionFn = type === "login" ? login : signup;

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [lastResult, action, isPending] = useActionState(actionFn, undefined);

  const [form, fields] = useForm<AuthSchemaType>({
    lastResult,
    defaultValue: {
      email: "",
      password: "",
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: authSchema });
    },
  });

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        // NOTE: 開発時にトーストが二つ表示されないよう id を指定
        id: "auth-success",
      });

      router.replace(pathname, { scroll: false });
    }
  }, [successMessage, router, pathname]);

  useFormResultToast(lastResult, { showSuccessToast: false });

  return (
    <form
      action={action}
      {...getFormProps(form)}
      className="flex flex-col gap-6 max-w-sm mx-auto"
    >
      <FormField
        labelText="メールアドレス"
        htmlFor="email"
        error={fields.email.errors?.[0]}
      >
        <FormInput
          placeholder="user@example.com"
          {...getInputProps(fields.email, { type: "email" })}
          isError={!!fields.email.errors}
        />
      </FormField>

      <FormField
        labelText="パスワード"
        htmlFor="password"
        error={fields.password.errors?.[0]}
      >
        <FormPassword
          isPasswordShow={isPasswordShow}
          setIsPasswordShow={setIsPasswordShow}
          {...getInputProps(fields.password, { type: "password" })}
          isError={!!fields.password.errors}
        />
      </FormField>

      <Button type="submit" loading={isPending}>
        {type === "login" ? "ログイン" : "新規登録"}
      </Button>
    </form>
  );
};

export default AuthForm;
