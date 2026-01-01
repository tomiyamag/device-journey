import { login, signup } from "@/actions/auth";

import FormInput from "../atoms/FormInput";
import FormSubmitButton from "../atoms/FormSubmitButton";

export type AuthType = "login" | "signup";

export interface IAuthForm {
  type: AuthType;
}

const AuthForm = ({ type }: IAuthForm) => {
  const labelClassNames = "font-bold text-sm text-gray-600 mb-3 inline-block";

  return (
    <form className="flex flex-col gap-6 max-w-sm mx-auto">
      <div>
        <label htmlFor="email" className={labelClassNames}>
          メールアドレス
        </label>
        <FormInput
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
        <FormInput id="password" name="password" type="password" required />
      </div>

      {type === "login" ? (
        <FormSubmitButton formAction={login}>ログイン</FormSubmitButton>
      ) : (
        <FormSubmitButton formAction={signup}>新規登録</FormSubmitButton>
      )}
    </form>
  );
};

export default AuthForm;
