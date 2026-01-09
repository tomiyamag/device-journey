import AuthContainer from "@/components/organisms/AuthContainer";

interface ILoginPage {
  searchParams: Promise<{
    message: string;
  }>;
}

export default async function LoginPage({ searchParams }: ILoginPage) {
  return (
    <AuthContainer
      type="login"
      title="Device Journey にログイン"
      successMessage={(await searchParams).message}
    />
  );
}
