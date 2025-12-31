import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface IManageLink {
  href: string;
  label: string;
}

const ManageLink = ({ href, label }: IManageLink) => {
  return (
    <Link
      href={href}
      className="flex gap-1 items-center text-teal-700 text-xs sm:text-sm underline hover:no-underline"
    >
      <span>{label}</span>
      <IoIosArrowForward />
    </Link>
  );
};

export default ManageLink;
