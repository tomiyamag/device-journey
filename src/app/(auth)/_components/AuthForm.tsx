"use client";

import {
  getFormProps,
  getInputProps,
  type Submission,
  useForm,
} from "@conform-to/react";
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

import { authSchema, signupSchema } from "../_lib/schema";

export type AuthType = "login" | "signup";

export interface IAuthForm {
  type: AuthType;
  successMessage?: string;
  errorMessage?: string;
}

type AuthSchemaType = z.input<typeof signupSchema>;

const AuthForm = ({ type, successMessage, errorMessage }: IAuthForm) => {
  const router = useRouter();
  const pathname = usePathname();

  const actionFn = type === "login" ? login : signup;
  const formSchema = type === "login" ? authSchema : signupSchema;

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPasswordConfirmationShow, setIsPasswordConfirmationShow] =
    useState(false);
  const [lastResult, action, isPending] = useActionState(actionFn, undefined);

  const [form, fields] = useForm<AuthSchemaType>({
    lastResult,
    defaultValue: {
      email: "",
      password: "",
      password_confirmation: "",
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      // NOTE: ログイン時は signupSchema の確認用パスワードを検証しないため、
      // フォーム全体の型（新規登録）に合わせて戻り値の型を揃える
      return parseWithZod(formData, {
        schema: formSchema,
      }) as Submission<AuthSchemaType>;
    },
  });

  useEffect(() => {
    if (!successMessage && !errorMessage) return;

    if (successMessage) {
      toast.success(successMessage, {
        // NOTE: 開発時にトーストが二つ表示されないよう id を指定
        id: "auth-success",
      });
    }

    if (errorMessage) {
      toast.error(errorMessage, {
        id: "auth-error",
      });
    }

    router.replace(pathname, { scroll: false });
  }, [successMessage, errorMessage, router, pathname]);

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

      {type === "signup" && (
        <FormField
          labelText="パスワード（確認用）"
          htmlFor="password_confirmation"
          error={fields.password_confirmation.errors?.[0]}
        >
          <FormPassword
            isPasswordShow={isPasswordConfirmationShow}
            setIsPasswordShow={setIsPasswordConfirmationShow}
            {...getInputProps(fields.password_confirmation, {
              type: "password",
            })}
            isError={!!fields.password_confirmation.errors}
          />
        </FormField>
      )}

      <Button type="submit" loading={isPending}>
        {type === "login" ? "ログイン" : "新規登録"}
      </Button>
    </form>
  );
};

export default AuthForm;
