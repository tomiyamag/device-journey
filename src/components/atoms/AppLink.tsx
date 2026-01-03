import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface IAppLink {
  href: string;
  label: string;
}

const AppLink = ({ href, label }: IAppLink) => {
  return (
    <Link
      href={href}
      className="inline-flex gap-1 items-center text-teal-700 text-sm underline hover:no-underline"
    >
      <span>{label}</span>
      <IoIosArrowForward />
    </Link>
  );
};

export default AppLink;
