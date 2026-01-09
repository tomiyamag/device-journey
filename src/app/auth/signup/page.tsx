import AuthContainer from "@/components/organisms/AuthContainer";

export default function SignupPage() {
  return (
    <AuthContainer
      type="signup"
      title="アカウントを作成する"
      description="サービスを利用するには、アカウント登録が必要です。"
    />
  );
}
