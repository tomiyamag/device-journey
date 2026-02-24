import { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

interface ISkeleton {
  className?: string;
  theme?: "gray" | "darkgray" | "white";
  children?: ReactNode;
}

const Skeleton = ({ className, theme = "gray", children }: ISkeleton) => {
  return (
    <div
      className={cn(
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
