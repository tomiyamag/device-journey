import classNames from "classnames";
import { ReactNode } from "react";

interface IErrorText {
  className?: string;
  children: ReactNode;
}

const ErrorText = ({ className, children }: IErrorText) => {
  return (
    <div
      className={classNames(
        "text-center text-sm/relaxed sm:text-base/relaxed text-gray-500 py-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ErrorText;
