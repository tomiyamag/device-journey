import { redirect } from "next/navigation";

import { getUser } from "@/lib/queries/user";

import AuthLayout, { IAuthLayout } from "./AuthLayout";

const AuthLayoutContainer = async ({ ...rest }: IAuthLayout) => {
  const user = await getUser();

  if (user && user.email_confirmed_at) {
    redirect("/");
  }

  return <AuthLayout {...rest} />;
};

export default AuthLayoutContainer;
