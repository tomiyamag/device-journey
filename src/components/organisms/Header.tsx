"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { UserProfile } from "@/types";

import Menu from "../molecules/Menu";

interface IHeader {
  profile: UserProfile;
}

const Header = ({ profile }: IHeader) => {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  return (
    <header className="bg-white h-24 sticky top-0 -left-5 z-30 w-full px-5 sm:px-16 flex items-center justify-between gap-8">
      <div className="flex gap-6 sm:gap-8 items-center">
        <div>
          <Menu />
        </div>
        <h1>
          {isDashboard && (
            <>
              おかえりなさい、
              <br />
            </>
          )}
          <span className="flex items-center gap-3">
            {!isDashboard && (
              <Link
                href="/dashboard"
                className="transition-opacity hover:opacity-80"
              >
                🏠
              </Link>
            )}
            <strong>{profile.username}</strong>
          </span>
        </h1>
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
