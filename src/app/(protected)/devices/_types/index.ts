import { MergeDeep } from "type-fest";

import { Database } from "@/types";

export type DeviceInput = Database["public"]["Tables"]["devices"]["Insert"];
export type DeviceInputDraft = MergeDeep<
  DeviceInput,
  {
    candidate_colors: string[];
    candidate_storages: string[];
  }
>;

export type DeviceFormState =
  | {
      status?: "error" | "success";
      error?: Record<string, string[] | null>;
    }
  | undefined;
