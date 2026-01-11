"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { login, signup } from "@/actions/auth";
import { authFormSchema } from "@/schemas/authForm";

import Button from "../atoms/Button";
import FormInput from "../atoms/FormInput";
import FormInputPassword from "../atoms/FormInputPassword";
import FormField from "./FormField";

export type AuthType = "login" | "signup";

export interface IAuthForm {
  type: AuthType;
  successMessage?: string;
}

type AuthSchemaType = z.input<typeof authFormSchema>;

const AuthForm = ({ type, successMessage }: IAuthForm) => {
  const router = useRouter();
  const pathname = usePathname();

  const actionFn = type === "login" ? login : signup;
  const initialFormState = { errorMessage: "" };

  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const [formState, formAction, isPending] = useActionState(
    actionFn,
    initialFormState,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(authFormSchema),
  });

  const onSubmit = (data: AuthSchemaType) => {
    // Server Action は FormData を期待しているため変換する
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);

    startTransition(() => {
      formAction(formData);
    });
  };

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 max-w-sm mx-auto"
    >
      <FormField
        labelText="メールアドレス"
        htmlFor="email"
        error={errors?.email?.message}
      >
        <FormInput
          id="email"
          type="email"
          placeholder="user@example.com"
          {...register("email")}
          isError={!!errors.email}
        />
      </FormField>

      <FormField
        labelText="パスワード"
        htmlFor="password"
        error={errors?.password?.message}
      >
        <FormInputPassword
          id="password"
          isPasswordShow={isPasswordShow}
          setIsPasswordShow={setIsPasswordShow}
          {...register("password")}
          isError={!!errors.password}
        />
      </FormField>

      <Button loading={isPending}>
        {type === "login" ? "ログイン" : "新規登録"}
      </Button>
    </form>
  );
};

export default AuthForm;
