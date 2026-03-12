import { Suspense } from "react";

import AuthLayoutContainer from "../_components/AuthLayoutContainer";

interface Props {
  searchParams: Promise<{
    successMessage?: string;
    errorMessage?: string;
  }>;
}

export default function LoginPage({ searchParams }: Props) {
  return (
    <Suspense>
      <AuthLayoutContainer
        type="login"
        title="Device Journey にログイン"
        description="あなたのモバイル遍歴を、スマートに管理。"
        searchParams={searchParams}
      />
    </Suspense>
  );
}
