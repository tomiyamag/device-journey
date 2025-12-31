import classNames from "classnames";
import { ReactNode } from "react";

interface IInformationHeading {
  className?: string;
  action?: ReactNode;
  children: ReactNode;
}

const InformationHeading = ({
  className,
  action,
  children,
}: IInformationHeading) => {
  return (
    <div
      className={classNames(
        "flex gap-4 justify-between items-center mb-2.5",
        className,
      )}
    >
      <h2 className="font-bold sm:text-lg">{children}</h2>
      {action && action}
    </div>
  );
};

export default InformationHeading;
