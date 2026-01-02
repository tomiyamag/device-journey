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

const SearchDeviceForm = () => {
  const { query, setQuery, setSelectedDeviceId } = useDeviceSearchStore();
  const [selectedDevice, setSelectedDevice] =
    useState<AutocompleteMobileApiResult | null>(null);

  const { data, isFetching, isError } = useAutocompleteMobileDevices(query);

  const isSuggestionsShow = query.length > minLength;

  return (
    <div>
      <FormLabel htmlFor="deviceName" labelText="機種名を入力してください" />

      <Combobox
        value={selectedDevice}
        onChange={(value) => {
          setSelectedDevice(value);

          if (value) {
            setQuery(value.name);
            setSelectedDeviceId(value.id);
          }
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
            {data &&
              data.length > 0 &&
              data.map((device: AutocompleteMobileApiResult) => (
                <ComboboxOption
                  key={device.id}
                  value={device}
                  className="px-3.5 py-3 empty:invisible data-leave:data-closed:opacity-0 data-focus:bg-slate-100"
                >
                  <div className="text-gray-600">{device.name}</div>
                </ComboboxOption>
              ))}

            {isFetching && (
              <StatusMessage label="デバイスを検索しています..." />
            )}
            {isError && <StatusMessage label="通信エラーが発生しました" />}

            {!isFetching && !isError && (!data || data.length === 0) && (
              <StatusMessage label="デバイスが見つかりませんでした" />
            )}
          </ComboboxOptions>
        )}
      </Combobox>
    </div>
  );
};

export default SearchDeviceForm;
