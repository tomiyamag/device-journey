import Link from "next/link";

import AuthForm, { AuthType, IAuthForm } from "../molecules/AuthForm";

interface IAuthContainer extends IAuthForm {
  title: string;
  description?: string;
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

const AuthContainer = ({ type, title, description }: IAuthContainer) => {
  const meta = AUTH_META[type];

  return (
    <main className="py-32 px-5 sm:px-16">
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-col gap-7 items-center">
            {/* TODO: ロゴ指定 */}
            <img
              src="https://placehold.jp/40x40.png"
              alt=""
              className="w-10 h-10"
            />
            <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
            {description && (
              <p className="text-center text-sm text-gray-600">{description}</p>
            )}
          </div>

          <div className="w-full">
            <AuthForm type={type} />
          </div>

          <div className="flex gap-4 justify-center text-sm text-gray-600">
            <p>{meta.switchText}</p>
            <Link href={meta.href} className="underline hover:no-underline">
              {meta.linkText}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthContainer;
