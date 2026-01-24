import classNames from "classnames";
import { ReactNode } from "react";

interface ISkeleton {
  className?: string;
  theme?: "gray" | "darkgray" | "white";
  children?: ReactNode;
}

const Skeleton = ({ className, theme = "gray", children }: ISkeleton) => {
  return (
    <div
      className={classNames(
        "animate-pulse",
        {
          "bg-gray-100": theme === "gray",
          "bg-gray-200": theme === "darkgray",
          "bg-white": theme === "white",
        },
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Skeleton;
