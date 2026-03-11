import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface IAppLink {
  href: string;
  label: string;
  prefetch?: boolean;
}

const AppLink = ({ href, label, prefetch }: IAppLink) => {
  return (
    <Link
      href={href}
      className="inline-flex gap-1 items-center text-teal-700 text-sm underline hover:no-underline"
      prefetch={prefetch}
    >
      <span>{label}</span>
      <IoIosArrowForward />
    </Link>
  );
};

export default AppLink;
