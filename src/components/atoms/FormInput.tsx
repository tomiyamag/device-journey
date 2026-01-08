import classNames from "classnames";
import { ComponentProps, forwardRef } from "react";

interface IFormInput extends ComponentProps<"input"> {
  className?: string;
  id: string;
  type: string;
  isError?: boolean;
}

export const InputClassNames =
  "appearance-none border border-gray-300 rounded-lg h-11 w-full block px-3.5 py-0 bg-white shadow-xs placeholder:text-gray-300 focus:outline-2 focus:outline-teal-600";

const FormInput = forwardRef<HTMLInputElement, IFormInput>(
  ({ className, id, type, isError, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={classNames(
          InputClassNames,
          className,
          "read-only:bg-gray-50 read-only:text-gray-500 read-only:cursor-default read-only:focus:outline-none",
          {
            "text-red-600 bg-red-100! border-red-400! focus:outline-red-300!":
              isError,
          },
        )}
        id={id}
        type={type}
        {...rest}
      />
    );
  },
);

// デバッグ用
FormInput.displayName = "FormInput";

export default FormInput;
