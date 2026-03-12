import Link from "next/link";
import { ReactNode } from "react";
import { TbDeviceMobileCheck } from "react-icons/tb";

import AuthForm, { AuthType, IAuthForm } from "./AuthForm";

export interface IAuthLayout extends IAuthForm {
  title: ReactNode;
  description?: string;
  successMessage?: string;
  errorMessage?: string;
}

const AUTH_META: Record<
  AuthType,
  {
    switchText: string;
    linkText: string;
    href: string;
  }
> = {
  login: {
    switchText: "アカウントをお持ちではありませんか？",
    linkText: "新規登録",
    href: "/signup",
  },
  signup: {
    switchText: "すでにアカウントをお持ちですか？",
    linkText: "ログイン",
    href: "/login",
  },
};

const AuthLayout = ({
  type,
  title,
  description,
  successMessage,
  errorMessage,
}: IAuthLayout) => {
  const meta = AUTH_META[type];

  return (
    <main className="min-h-svh flex flex-col items-center justify-center py-10 px-5 sm:px-16">
      <div className="flex flex-col gap-10 w-full">
        <div className="flex flex-col gap-8 items-center">
          <TbDeviceMobileCheck className="text-6xl text-teal-600" />

          <div className="flex flex-col justify-center text-center gap-5">
            <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
            {description && (
              <p className="text-center text-sm text-gray-600">{description}</p>
            )}
          </div>
        </div>
        <div className="w-full">
          <AuthForm
            type={type}
            successMessage={successMessage}
            errorMessage={errorMessage}
          />
        </div>

        <div className="flex gap-4 justify-center text-sm text-gray-600">
          <p>{meta.switchText}</p>
          <Link
            href={meta.href}
            className="underline hover:no-underline"
            prefetch
          >
            {meta.linkText}
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
