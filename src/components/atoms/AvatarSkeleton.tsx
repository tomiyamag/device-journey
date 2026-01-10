import classNames from "classnames";

import { IAvatar } from "./Avatar";
import Skeleton from "./Skeleton";

const AvatarSkeleton = ({ size }: IAvatar) => {
  return (
    <Skeleton
      className={classNames("rounded-full border border-gray-200", {
        "w-40 sm:w-50 h-40 sm:h-50": size === "full",
        "w-10 sm:w-11.5 h-10 sm:h-11.5": size === "small",
      })}
      theme="darkgray"
    />
  );
};

export default AvatarSkeleton;
