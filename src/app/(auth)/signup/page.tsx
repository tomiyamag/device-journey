import { Suspense } from "react";

import AuthLayoutContainer from "../_components/AuthLayoutContainer";

export default function SignupPage() {
  return (
    <Suspense>
      <AuthLayoutContainer
        type="signup"
        title="アカウントを作成する"
        description="サービスを利用するには、アカウント登録が必要です。"
      />
    </Suspense>
  );
}
