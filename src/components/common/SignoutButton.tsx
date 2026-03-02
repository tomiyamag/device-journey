import { signout } from "@/actions/auth";

import SubmitButton from "./SubmitButton";

const SignoutButton = () => {
  const formAction = async () => {
    await signout();
  };

  return (
    <form>
      <SubmitButton
        formAction={formAction}
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
