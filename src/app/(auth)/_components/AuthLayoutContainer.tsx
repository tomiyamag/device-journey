import { redirect } from "next/navigation";

import { getUser } from "@/lib/queries/user";

import AuthLayout, { IAuthLayout } from "./AuthLayout";

interface IAuthLayoutContainer extends IAuthLayout {
  searchParams?: Promise<{
    successMessage?: string;
    errorMessage?: string;
  }>;
}

const AuthLayoutContainer = async ({
  searchParams,
  ...rest
}: IAuthLayoutContainer) => {
  const user = await getUser();

  if (user && user.email_confirmed_at) {
    redirect("/");
  }

  const { successMessage, errorMessage } = (await searchParams) || {};

  return (
    <AuthLayout
      successMessage={successMessage}
      errorMessage={errorMessage}
      {...rest}
    />
  );
};

export default AuthLayoutContainer;
