"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import AccountForm from "@/components/organisms/AccountForm";
import { useProfile } from "@/hooks/useProfile";

import ContentLoadingSpinner from "../atoms/ContentLoadingSpinner";
import ErrorText from "../atoms/ErrorText";

interface IAccountFormContainer {
  email: string;
  confirmSuccessMessage?: string;
}

const AccountFormContainer = ({
  email,
  confirmSuccessMessage,
}: IAccountFormContainer) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: userProfile, isLoading, isError, error } = useProfile();

  // メールアドレス確認成功時
  useEffect(() => {
    if (confirmSuccessMessage) {
      toast.success(confirmSuccessMessage, {
        // NOTE: 開発時にトーストが二つ表示されないよう id を指定
        id: "email-confirmed",
      });

      router.replace(pathname);
    }
  }, [confirmSuccessMessage, router, pathname]);

  if (isLoading) {
    return <ContentLoadingSpinner className="py-32" />;
  }

  if (isError) {
    return <ErrorText>{error.message}</ErrorText>;
  }

  if (!userProfile) {
    return null;
  }

  return <AccountForm profile={userProfile} email={email} />;
};

export default AccountFormContainer;
