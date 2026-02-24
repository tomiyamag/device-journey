import Link from "next/link";
import { Suspense } from "react";
import { TbMenuDeep } from "react-icons/tb";

import UserNameContainer from "../common/UserNameContainer";
import { UserNameSkeleton } from "../common/UserNameSkeleton";
import { AvatarSkeleton } from "../ui/Avatar";
import { AvatarContainer } from "../ui/AvatarContainer";
import Menu from "./Menu";

const Header = () => {
  return (
    <header className="bg-white h-20 sm:h-24 sticky top-0 -left-5 z-30 w-full px-5 sm:px-16 flex items-center justify-between gap-8">
      <div className="flex gap-5 sm:gap-8 items-center flex-1 relative truncate">
        <div className="absolute right-0 z-10 h-full w-10 bg-linear-to-r from-transparent to-white pointer-events-none"></div>

        {/* NOTE: useSelectedLayoutSegment() によるレンダリングブロックを防ぐため、Suspense で分離 */}
        <Suspense fallback={<TbMenuDeep size={22} className="-scale-x-100" />}>
          <Menu />
        </Suspense>

        <Suspense fallback={<UserNameSkeleton />}>
          <UserNameContainer />
        </Suspense>
      </div>

      <div className="shrink-0">
        <Suspense fallback={<AvatarSkeleton size="small" />}>
          <Link href="/account" className="block" prefetch>
            <AvatarContainer size="small" />
          </Link>
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
