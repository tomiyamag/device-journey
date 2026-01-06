import classNames from "classnames";
import { ComponentProps, ReactNode } from "react";

export interface IButton extends ComponentProps<"button"> {
  className?: string;
  variant?: "primary" | "secondary" | "tertiary" | "back";
  size?: "sm" | "full" | "auto";
  disabled?: boolean;
  loading?: boolean;
  children: ReactNode;
}

const Button = ({
  className,
  children,
  variant = "primary",
  size = "full",
  disabled,
  loading,
  ...rest
}: IButton) => {
  return (
    <button
      className={classNames(
        "rounded-lg h-11 block font-bold -bg-linear-210 to-60% shadow-sm cursor-pointer transition-opacity hover:opacity-80 disabled:text-gray-100 disabled:from-transparent disabled:to-transparent disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed disabled:hover:opacity-100",
        {
          "w-full mx-auto": size === "full",
          "w-full sm:w-xs text-sm mx-auto": size === "sm",
          "w-auto text-sm": size === "auto",
        },
        {
          "from-cyan-600 to-teal-600 text-white": variant === "primary",
          "from-teal-300 to-teal-500 text-white": variant === "secondary",
          "from-slate-400 to-gray-500 text-white": variant === "tertiary",
          "from-white to-white border-2 border-teal-600 text-teal-600":
            variant === "back",
        },
        className,
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <div className="flex justify-center items-center gap-2">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
