import { login, signup } from "@/app/(auth)/auth/actions";

import Input from "../atoms/forms/Input";
import SubmitButton from "../atoms/forms/SubmitButton";

export interface IAuthForm {
  type: "login" | "signup";
}

const AuthForm = ({ type }: IAuthForm) => {
  const labelClassNames = "font-bold text-sm text-gray-600 mb-3 inline-block";

  return (
    <form className="flex flex-col gap-6 max-w-sm mx-auto">
      <div>
        <label htmlFor="email" className={labelClassNames}>
          メールアドレス
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="user@example.com"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClassNames}>
          パスワード
        </label>
        <Input id="password" name="password" type="password" required />
      </div>

      {type === "login" ? (
        <SubmitButton formAction={login}>ログイン</SubmitButton>
      ) : (
        <SubmitButton formAction={signup}>新規登録</SubmitButton>
      )}
    </form>
  );
};

export default AuthForm;
