import AuthLayoutContainer from "../_components/AuthLayoutContainer";

interface Props {
  searchParams: Promise<{
    message: string;
  }>;
}

export default async function LoginPage({ searchParams }: Props) {
  return (
    <AuthLayoutContainer
      type="login"
      title="Device Journey にログイン"
      description="あなたのモバイル遍歴を、スマートに管理。"
      successMessage={(await searchParams).message}
    />
  );
}
