import classNames from "classnames";

interface IContentLoadingSpinner {
  className?: string;
}

const ContentLoadingSpinner = ({ className }: IContentLoadingSpinner) => {
  return (
    <div className={classNames("font-bold text-sm", className)}>
      <div className="flex justify-center items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-teal-600 border-t-transparent"></div>
      </div>
    </div>
  );
};

export default ContentLoadingSpinner;
