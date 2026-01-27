import { Dispatch, SetStateAction } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

import { cn } from "@/lib/utils/cn";

import FormInput, { IFormInput } from "./FormInput";

interface IFormPassword extends IFormInput {
  isPasswordShow: boolean;
  setIsPasswordShow: Dispatch<SetStateAction<boolean>>;
}

const FormPassword = ({
  isPasswordShow,
  setIsPasswordShow,
  ...rest
}: IFormPassword) => {
  const iconClassNames = cn(
    "cursor-pointer text-lg rounded-xs",
    rest.isError ? "bg-red-100 text-red-400" : "text-gray-600",
  );

  return (
    <div className="relative">
      <FormInput
        {...rest}
        type={isPasswordShow ? "text" : "password"}
        className="pr-12"
      />
      <div className="h-full flex items-center px-4 absolute top-0 right-0">
        <div>
          <button
            type="button"
            onClick={() => setIsPasswordShow((prevState) => !prevState)}
            className="block outline-0"
          >
            {isPasswordShow ? (
              <LuEyeOff className={iconClassNames} />
            ) : (
              <LuEye className={iconClassNames} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormPassword;
