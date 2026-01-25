import { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

interface IContentHeading {
  className?: string;
  action?: ReactNode;
  children: ReactNode;
}

const ContentHeading = ({ className, action, children }: IContentHeading) => {
  return (
    <div
      className={cn(
        "flex gap-4 justify-between items-center mb-2.5",
        className,
      )}
    >
      <h2 className="font-bold sm:text-lg">{children}</h2>
      {action && action}
    </div>
  );
};

export default ContentHeading;
