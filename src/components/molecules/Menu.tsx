"use client";

import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import classNames from "classnames";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { IconType } from "react-icons";
import { BiHome } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiDeviceTablet } from "react-icons/hi2";
import { TbMenuDeep, TbSettings } from "react-icons/tb";
import { TiChartLineOutline } from "react-icons/ti";

import { signout } from "@/actions/auth";

import FormSubmitButton from "../atoms/FormSubmitButton";

const Menu = () => {
  const segment = useSelectedLayoutSegment();

  const items: {
    pathname: string;
    icon?: IconType;
    label: string;
    disabled?: boolean;
  }[] = [
    {
      pathname: "dashboard",
      icon: BiHome,
      label: "ホーム",
    },
    {
      pathname: "devices",
      icon: HiDeviceTablet,
      label: "登録デバイス一覧",
    },
    {
      pathname: "",
      icon: HiOutlineLocationMarker,
      label: "訪れた場所",
      disabled: true,
    },
    {
      pathname: "",
      icon: TiChartLineOutline,
      label: "コスト推移",
      disabled: true,
    },
    {
      pathname: "account",
      icon: TbSettings,
      label: "ユーザー設定",
    },
  ];

  const IconWrapper = ({
    className,
    icon: Icon,
  }: {
    className?: string;
    icon: IconType;
  }) => {
    return <Icon size={18} className={classNames(className)} />;
  };

  return (
    <Popover className="relative">
      <PopoverButton className="cursor-pointer outline-none">
        <TbMenuDeep size={22} />
      </PopoverButton>

      <PopoverPanel
        transition
        anchor="bottom start"
        className="z-50 w-xs p-1 bg-black/20 backdrop-blur-sm mt-4 rounded-xl shadow-sm transition ease-out data-closed:scale-95 data-closed:opacity-0"
      >
        <div className="bg-white rounded-lg">
          <ul className="flex flex-col gap-2 p-2">
            {items.map((item) => (
              <li key={item.label}>
                <CloseButton
                  as={Link}
                  href={`/${item.pathname}`}
                  className={classNames(
                    "flex gap-2 items-center p-3 rounded-md transition",
                    {
                      "border-transparent": segment !== item.pathname,
                      "bg-gray-100 border-gray-200 pointer-events-none":
                        segment === item.pathname,
                      "hover:bg-gray-100 hover:border-gray-200": !item.disabled,
                      "text-gray-400 pointer-events-none": item.disabled,
                    },
                  )}
                >
                  {item.icon && (
                    <IconWrapper
                      icon={item.icon}
                      className={classNames(
                        item.disabled ? "text-gray-300" : "text-gray-600",
                      )}
                    />
                  )}
                  {item.label}
                </CloseButton>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3 pb-2 px-3">
          <div className="flex gap-2 items-center justify-between">
            <div>
              <a
                href="https://github.com/tomiyamag/device-journey/issues"
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm font-bold text-gray-700 hover:underline"
              >
                問題を報告
              </a>
            </div>

            <form>
              <FormSubmitButton
                formAction={signout}
                size="auto"
                variant="tertiary"
                className="w-28!"
              >
                ログアウト
              </FormSubmitButton>
            </form>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default Menu;
