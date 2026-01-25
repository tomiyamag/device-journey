"use client";

import { useQueryClient } from "@tanstack/react-query";

import { signout } from "@/actions/auth";

import SubmitButton from "./SubmitButton";

const SignoutButton = () => {
  const queryClient = useQueryClient();

  const handleClick = async () => {
    // クライアント側の全てのキャッシュを初帰化
    queryClient.clear();
    await signout();
  };

  return (
    <form>
      <SubmitButton
        formAction={handleClick}
        size="auto"
        variant="tertiary"
        className="w-28!"
      >
        ログアウト
      </SubmitButton>
    </form>
  );
};

export default SignoutButton;
