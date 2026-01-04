import classNames from "classnames";
import { ReactNode } from "react";
import { IconType } from "react-icons";

import InfoButton from "./InfoButton";

interface IFeature {
  className?: string;
  icon: IconType;
  title: string;
  info?: {
    onClick: () => void;
  };
  dashboard?: boolean;
  children: ReactNode;
}

const Feature = ({
  className,
  icon: Icon,
  title,
  info,
  dashboard = false,
  children,
}: IFeature) => {
  return (
    <div
      className={classNames(
        "flex items-center gap-2 sm:gap-4 w-full whitespace-nowrap",
        className,
      )}
    >
      <div className="rounded-full bg-gray-50 w-7 sm:w-9 h-7 sm:h-9 flex items-center justify-center shrink-0 shadow-sm">
        <Icon size={16} />
      </div>
      <div className="text-xs sm:text-sm text-black flex-1">
        <div className="font-bold relative inline-block">
          <span>{title}</span>
          {info && !dashboard && (
            <div className="absolute -top-1 -right-4">
              <InfoButton onClick={info.onClick} />
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Feature;
