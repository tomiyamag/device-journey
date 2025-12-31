import classNames from "classnames";
import { ReactNode } from "react";

export interface IButton extends React.ComponentProps<"button"> {
  className?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg" | "full";
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
        "rounded-lg h-11 block text-white font-bold cursor-pointer hover:opacity-80 disabled:text-gray-100 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:opacity-100",
        {
          "w-full": size === "full",
          // TODO: 他サイズのスタイル設定
        },
        {
          "bg-teal-500": variant === "primary",
          "bg-teal-400": variant === "secondary",
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
