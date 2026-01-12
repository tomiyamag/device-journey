import classNames from "classnames";
import { ComponentProps, forwardRef, ReactNode } from "react";

export interface IFormFile extends ComponentProps<"input"> {
  id: string;
  label: ReactNode;
  className?: string;
}

const FormFile = forwardRef<HTMLInputElement, IFormFile>(
  ({ id, label, className, ...rest }, ref) => {
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
          className={classNames("hidden", className)}
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
