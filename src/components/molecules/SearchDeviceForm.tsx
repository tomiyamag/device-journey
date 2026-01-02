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
import { AutocompleteMobileApiResult } from "@/types";

import FormLabel from "../atoms/FormLabel";

interface IStatusMessage {
  label: string;
}

interface ISearchDeviceForm {
  onDeviceSelected: (id: number) => void;
}

const StatusMessage = ({ label }: IStatusMessage) => {
  return <div className="px-3.5 py-3 text-gray-500">{label}</div>;
};

export const minLength = 1;

const SearchDeviceForm = ({ onDeviceSelected }: ISearchDeviceForm) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<AutocompleteMobileApiResult | null>(
    null,
  );

  const { data, isFetching, isError } = useAutocompleteMobileDevices(query);

  const isSuggestionsShow = query.length > minLength;

  return (
    <div>
      <FormLabel htmlFor="deviceName" labelText="機種名を入力してください" />

      <Combobox
        value={selected}
        onChange={(value) => {
          setSelected(value);
          if (value) {
            onDeviceSelected(value.id);
          }
        }}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            id="deviceName"
            className={InputClassNames}
            displayValue={(device: AutocompleteMobileApiResult | null) =>
              device?.name || ""
            }
            onChange={(event) => setQuery(event.target.value)}
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
            {data.length > 0 &&
              data.map((device: AutocompleteMobileApiResult) => (
                <ComboboxOption
                  key={device.id}
                  value={device}
                  className="px-3.5 py-3 empty:invisible data-leave:data-closed:opacity-0 data-focus:bg-slate-100"
                >
                  <div className="text-gray-600">{device.name}</div>
                </ComboboxOption>
              ))}

            {isFetching && <StatusMessage label="端末を検索しています..." />}
            {isError && <StatusMessage label="通信エラーが発生しました" />}

            {!isFetching && !isError && data.length === 0 && (
              <StatusMessage label="端末が見つかりませんでした" />
            )}
          </ComboboxOptions>
        )}
      </Combobox>
    </div>
  );
};

export default SearchDeviceForm;
