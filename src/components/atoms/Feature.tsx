import classNames from "classnames";
import { ReactNode } from "react";
import { IconType } from "react-icons";

interface IFeature {
  className?: string;
  icon: IconType;
  title: string;
  children: ReactNode;
}

const Feature = ({ className, icon: Icon, title, children }: IFeature) => {
  return (
    <div
      className={classNames(
        "flex items-center gap-2 sm:gap-4 w-full",
        className,
      )}
    >
      <div className="rounded-full bg-gray-50 w-7 sm:w-9 h-7 sm:h-9 flex items-center justify-center shadow-sm">
        <Icon size={16} />
      </div>
      <div className="text-xs sm:text-sm text-black flex-1">
        <div className="font-bold">{title}</div>
        {children}
      </div>
    </div>
  );
};

export default Feature;
