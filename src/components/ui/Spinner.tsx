import { cn } from "@/lib/utils/cn";

interface ISpinner {
  className?: string;
}

const Spinner = ({ className }: ISpinner) => {
  return (
    <div className={cn("font-bold text-sm", className)}>
      <div className="flex justify-center items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-teal-600 border-t-transparent"></div>
      </div>
    </div>
  );
};

export default Spinner;
