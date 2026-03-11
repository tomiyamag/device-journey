import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export interface IFormFile extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: ReactNode;
  className?: string;
}

const FormFile = forwardRef<HTMLInputElement, IFormFile>(
  (
    {
      id,
      label,
      className,
      // NOTE: input type="file" に value や defaultValue を指定できないため、取り出して渡さない
      value: _value,
      defaultValue: _defaultValue,
      ...rest
    },
    ref,
  ) => {
    return (
      <>
        <label
          className="inline-block cursor-pointer text-sm transition-opacity hover:opacity-80"
          htmlFor={id}
        >
          {label}
        </label>

        <input
          ref={ref}
          type="file"
          className={cn("hidden", className)}
          id={id}
          {...rest}
        />
      </>
    );
  },
);

// デバッグ用
FormFile.displayName = "FormFile";

export default FormFile;
