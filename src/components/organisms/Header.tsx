"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Avatar from "../atoms/Avatar";
import HeaderUserNameSkeleton from "../atoms/HeaderUserNameSkeleton";
import Menu from "../molecules/Menu";

// ハイドレーションエラー防止
const HeaderUserName = dynamic(() => import("../atoms/HeaderUserName"), {
  ssr: false,
  loading: () => <HeaderUserNameSkeleton />,
});

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="bg-white h-20 sm:h-24 sticky top-0 -left-5 z-30 w-full px-5 sm:px-16 flex items-center justify-between gap-8">
      <div className="flex gap-5 sm:gap-8 items-center flex-1 relative truncate">
        <span className="absolute right-0 z-10 block h-full w-10 bg-linear-to-r from-transparent to-white pointer-events-none"></span>
        <div>
          <Menu />
        </div>
        <HeaderUserName isHome={isHome} />
      </div>

      <div className="shrink-0">
        <Link href="/account" className="block">
          <Avatar size="small" />
        </Link>
      </div>

      <nav className="hidden"></nav>
    </header>
  );
};

export default Header;
