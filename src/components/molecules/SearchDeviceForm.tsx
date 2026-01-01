"use client";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useEffect, useState } from "react";

import { autocompleteMobileDevices } from "@/actions/mobile-api";
import { InputClassNames } from "@/components/atoms/FormInput";
import { IAutocompleteMobileApiResult } from "@/types";

import FormLabel from "../atoms/FormLabel";

interface IStatusMessage {
  label: string;
}

const StatusMessage = ({ label }: IStatusMessage) => {
  return <div className="px-3.5 py-3 text-gray-500">{label}</div>;
};

const SearchDeviceForm = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<
    IAutocompleteMobileApiResult[]
  >([]);
  const [selected, setSelected] = useState<IAutocompleteMobileApiResult | null>(
    null,
  );

  const minLength = 1;

  useEffect(() => {
    if (!(query.length > minLength)) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const timer = setTimeout(async () => {
      try {
        const data = await autocompleteMobileDevices(query);
        setSuggestions(data);
      } catch (error) {
        console.error(error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const isSuggestionsShow = query.length > minLength;

  return (
    <div>
      <FormLabel htmlFor="deviceName" labelText="機種名を入力してください" />

      <Combobox
        value={selected}
        onChange={(value) => {
          setSelected(value);

          // TODO: サジェスト結果クリック時の処理
          console.log("Selected:", value);
        }}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            id="deviceName"
            className={InputClassNames}
            displayValue={(device: IAutocompleteMobileApiResult | null) =>
              device?.name || ""
            }
            onChange={(event) => setQuery(event.target.value)}
            placeholder="iPhone 12 Pro, Pixel 5..."
            autoComplete="off"
          />
        </div>

        {isSuggestionsShow && (
          <ComboboxOptions
            anchor={{ to: "bottom", gap: 8 }}
            className="bg-white rounded-lg border border-gray-200 shadow-xs w-(--input-width) max-h-50!"
          >
            {suggestions.length > 0 &&
              suggestions.map((device: IAutocompleteMobileApiResult) => (
                <ComboboxOption
                  key={device.id}
                  value={device}
                  className="px-3.5 py-3 empty:invisible data-leave:data-closed:opacity-0 data-focus:bg-slate-100"
                >
                  <div className="text-gray-600">{device.name}</div>
                </ComboboxOption>
              ))}

            {isLoading && <StatusMessage label="端末を検索しています..." />}

            {!isLoading && suggestions.length === 0 && (
              <StatusMessage label="端末が見つかりませんでした" />
            )}
          </ComboboxOptions>
        )}
      </Combobox>
    </div>
  );
};

export default SearchDeviceForm;
