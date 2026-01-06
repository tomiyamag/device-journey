"use client";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";

import { InputClassNames } from "@/components/atoms/FormInput";
import { useAutocompleteMobileDevices } from "@/hooks/useMobileApi";
import { useDeviceSearchStore } from "@/store/useDeviceSearchStore";
import { AutocompleteMobileApiResult } from "@/types";

import FormLabel from "../atoms/FormLabel";

interface IStatusMessage {
  label: string;
}

const StatusMessage = ({ label }: IStatusMessage) => {
  return <div className="px-3.5 py-3 text-gray-500">{label}</div>;
};

export const minLength = 1;

const SearchDeviceFormContent = () => {
  const { query, setQuery, setSelectedDeviceId } = useDeviceSearchStore();
  const [selectedDevice, setSelectedDevice] =
    useState<AutocompleteMobileApiResult | null>(null);

  const { data, isFetching, isError } = useAutocompleteMobileDevices(query);

  const isSuggestionsShow = query.length > minLength;
  const hasData = data && data.length > 0;

  return (
    <div>
      <FormLabel htmlFor="deviceName" labelText="機種名を入力してください" />
      <Combobox
        value={selectedDevice}
        onChange={(value) => {
          // NOTE: サジェストクリック時（ComboboxOptions の onClick ではなくここ）
          setSelectedDevice(value);

          if (value) {
            setQuery(value.name);
            setSelectedDeviceId(value.id);
          }

          // 表示中の入力キーボードを閉じる
          (document.activeElement as HTMLElement | null)?.blur();
        }}
      >
        <div className="relative">
          <ComboboxInput
            id="deviceName"
            className={InputClassNames}
            displayValue={(device: AutocompleteMobileApiResult) =>
              device?.name || query
            }
            onChange={(event) => {
              const value = event.target.value;

              setQuery(value);

              if (value.length === 0) {
                setSelectedDeviceId(null);
                setSelectedDevice(null);
              }
            }}
            placeholder="iPhone 17 Pro, Pixel 9..."
            autoComplete="off"
          />
        </div>

        {isSuggestionsShow && (
          <ComboboxOptions
            anchor={{ to: "bottom", gap: 8 }}
            className="bg-white rounded-lg border border-gray-200 shadow-xs w-(--input-width) max-h-50! z-50"
            portal
          >
            {isFetching && (
              <StatusMessage label="デバイスを検索しています..." />
            )}

            {isError && <StatusMessage label="通信エラーが発生しました" />}

            {!isFetching && !isError && !hasData && (
              <StatusMessage label="デバイスが見つかりませんでした" />
            )}

            {!isFetching && hasData && (
              <>
                {data.map((device: AutocompleteMobileApiResult) => (
                  <ComboboxOption
                    key={device.id}
                    value={device}
                    className="px-3.5 py-3 empty:invisible data-leave:data-closed:opacity-0 data-focus:bg-slate-100"
                  >
                    <div className="text-gray-600">{device.name}</div>
                  </ComboboxOption>
                ))}
              </>
            )}
          </ComboboxOptions>
        )}
      </Combobox>
    </div>
  );
};

export default SearchDeviceFormContent;
