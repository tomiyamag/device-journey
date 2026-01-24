import { forwardRef, InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

export interface IFormInput extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  id: string;
  isError?: boolean;
}

export const InputClassNames =
  "appearance-none border border-gray-300 rounded-lg h-11 w-full block px-3.5 py-0 bg-white shadow-xs placeholder:text-gray-300 focus:outline-2 focus:outline-teal-600";

const FormInput = forwardRef<HTMLInputElement, IFormInput>(
  ({ className, id, isError, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          InputClassNames,
          "read-only:bg-gray-50 read-only:text-gray-500 read-only:cursor-default read-only:focus:outline-none",
          {
            "text-red-600 bg-red-100! border-red-400! focus:outline-red-300! placeholder:text-red-300":
              isError,
          },
          className,
        )}
        id={id}
        {...rest}
      />
    );
  },
);

FormInput.displayName = "FormInput";

export default FormInput;
