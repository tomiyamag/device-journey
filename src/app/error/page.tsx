import { PiSmileySad } from "react-icons/pi";

import AppLink from "@/components/atoms/AppLink";

export default function ErrorPage() {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center">
      <div className="w-full font-bold text-sm flex flex-col gap-5 justify-center items-center py-10">
        <PiSmileySad size={100} className="text-gray-300" />
        <div className="text-gray-400">予期せぬエラーが発生しました。</div>
      </div>

      <AppLink href="/" label="ホーム" />
    </div>
  );
}
