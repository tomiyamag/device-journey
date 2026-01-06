"use client";

import AccountForm from "@/components/organisms/AccountForm";
import { useProfile } from "@/hooks/useProfile";

import ContentLoadingSpinner from "../atoms/ContentLoadingSpinner";

interface IAccountFormContainer {
  email: string;
}

const AccountFormContainer = ({ email }: IAccountFormContainer) => {
  const { data: userProfile, isLoading } = useProfile();

  if (isLoading) {
    return <ContentLoadingSpinner className="py-32" />;
  }

  if (!userProfile) {
    return null;
  }

  return <AccountForm profile={userProfile} email={email} />;
};

export default AccountFormContainer;
