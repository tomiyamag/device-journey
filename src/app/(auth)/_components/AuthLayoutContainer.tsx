import { redirect } from "next/navigation";

import { getSessionUser } from "@/lib/queries/user";

import AuthLayout, { IAuthLayout } from "./AuthLayout";

interface IAuthLayoutContainer extends IAuthLayout {
  searchParams?: Promise<{
    message: string;
  }>;
}

const AuthLayoutContainer = async ({
  searchParams,
  ...rest
}: IAuthLayoutContainer) => {
  const user = await getSessionUser();

  if (user && user.email_confirmed_at) {
    redirect("/");
  }

  const { message: successMessage } = (await searchParams) || {};

  return <AuthLayout successMessage={successMessage} {...rest} />;
};

export default AuthLayoutContainer;
