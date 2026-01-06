"use client";

import { usePathname } from "next/navigation";

import HeaderUserName from "../atoms/HeaderUserName";
import Menu from "../molecules/Menu";

const Header = () => {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  return (
    <header className="bg-white h-24 sticky top-0 -left-5 z-30 w-full px-5 sm:px-16 flex items-center justify-between gap-8">
      <div className="flex gap-6 sm:gap-8 items-center">
        <div>
          <Menu />
        </div>
        <HeaderUserName isDashboard={isDashboard} />
      </div>

      <div className="">
        <img
          src="https://placehold.jp/40x40.png"
          alt=""
          className="w-13 h-13 rounded-full overflow-hidden"
        />
      </div>

      <nav className="hidden"></nav>
    </header>
  );
};

export default Header;
