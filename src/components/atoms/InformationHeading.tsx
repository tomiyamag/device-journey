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
    <div className="flex gap-4 justify-between items-center">
      <h2 className={classNames("font-bold sm:text-lg", className)}>
        {children}
      </h2>
      {action && action}
    </div>
  );
};

export default InformationHeading;
