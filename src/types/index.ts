import { MergeDeep } from "type-fest";

import { Database as DatabaseGenerated } from "./supabase";

export type DeviceSpec = {
  display: string;
  camera: string;
  battery: string;
  weight: string;
  hardware: string;
  storage: string;
};

export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Tables: {
        devices: {
          Row: {
            spec: DeviceSpec;
          };
          Insert: {
            spec: DeviceSpec;
          };
          Update: {
            spec?: DeviceSpec;
          };
        };
      };
    };
  }
>;

export type Device = Database["public"]["Tables"]["devices"]["Row"];
export type UserProfile = Database["public"]["Tables"]["profiles"]["Row"];
export type FormState =
  | {
      status?: "error" | "success";
      error?: Record<string, string[] | null>;
    }
  | undefined;
