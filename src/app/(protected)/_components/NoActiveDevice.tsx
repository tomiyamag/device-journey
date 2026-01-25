import Link from "next/link";
import { ReactNode } from "react";
import { IoAddCircleOutline } from "react-icons/io5";

import Panel from "@/components/ui/Panel";

interface INoActiveDevice {
  href: string;
  content: ReactNode;
}

const NoActiveDevice = ({ href, content }: INoActiveDevice) => {
  return (
    <Link href={href} className="block transition-opacity hover:opacity-80">
      <Panel
        footer={
          <div className="text-center font-bold">
            Device Journey へようこそ 👋
          </div>
        }
      >
        <div className="h-62 sm:h-48 flex flex-col gap-5 items-center justify-center">
          <IoAddCircleOutline className="text-4xl text-teal-600" />
          <div className="text-sm font-bold text-center text-gray-600">
            {content}
          </div>
        </div>
      </Panel>
    </Link>
  );
};

export default NoActiveDevice;
