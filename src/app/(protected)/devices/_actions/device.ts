"use server";

import { parseWithZod } from "@conform-to/zod/v4";
import { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { getUser } from "@/lib/queries/user";
import { createClient } from "@/lib/supabase/server";

import { registerDeviceSchema, updateDeviceSchema } from "../_lib/schema";
import { DeviceFormState, DeviceInputDraft } from "../_types";

// 全デバイスの is_main フラグを false にリセットする
const resetMainDeviceFlags = async (
  supabase: SupabaseClient,
  userId: string,
) => {
  const { error } = await supabase
    .from("devices")
    .update({ is_main: false })
    .eq("user_id", userId);

  return error;
};

// デバイス画像を Base64 に変換
async function resolveDeviceImage(endpoint: string | null | undefined) {
  if (!endpoint) {
    return null;
  }

  // デバイス ID 抽出
  const id = endpoint.split("/").pop();

  if (!id) {
    return null;
  }

  const apiKey = process.env.MOBILE_API_KEY;
  const url = `https://api.mobileapi.dev/devices/${id}/image/?key=${apiKey}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return null;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    return `data:${res.headers.get("Content-Type") || "image/jpeg"};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function registerDevice(
  draftData: DeviceInputDraft,
  prevState: DeviceFormState,
  formData: FormData,
): Promise<DeviceFormState> {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return {
      status: "error",
      error: { "": ["ユーザーが見つかりません。"] },
    };
  }

  const submission = parseWithZod(formData, { schema: registerDeviceSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { status: deviceStatus, ...restValidatedFormData } = submission.value;

  // メインデバイスとして登録された場合
  if (deviceStatus === "main") {
    const error = await resetMainDeviceFlags(supabase, user.id);

    if (error) {
      console.error("DB Error: ", error);

      return {
        status: "error",
        error: { "": ["デバイス情報の更新に失敗しました。"] },
      };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { candidate_colors, candidate_storages, ...restDraftData } = draftData;

  const payload = {
    ...restDraftData,
    ...restValidatedFormData,
    user_id: user.id,
    image_url: await resolveDeviceImage(draftData.image_url),
  };

  const { error } = await supabase.from("devices").insert(payload);

  if (error) {
    console.error("DB Error: ", error);

    return {
      status: "error",
      error: { "": ["デバイスの登録に失敗しました。"] },
    };
  }

  revalidateTag(`devices-${user.id}`, "max");
  redirect(`/devices/?registered=1`);
}

export async function updateDevice(
  prevState: DeviceFormState,
  formData: FormData,
): Promise<DeviceFormState> {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return {
      status: "error",
      error: { "": ["ユーザーが見つかりません。"] },
    };
  }

  const submission = parseWithZod(formData, { schema: updateDeviceSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const {
    device_id: deviceId,
    status: deviceStatus,
    ...restValidatedFormData
  } = submission.value;

  // メインデバイスとして登録された場合
  if (deviceStatus === "main") {
    const error = await resetMainDeviceFlags(supabase, user.id);

    if (error) {
      console.error("DB Error: ", error);

      return {
        status: "error",
        error: { "": ["デバイス情報の更新に失敗しました。"] },
      };
    }
  }

  const payload = { ...restValidatedFormData };

  const { error } = await supabase
    .from("devices")
    .update(payload)
    .eq("id", deviceId)
    .eq("user_id", user.id);

  if (error) {
    console.error("DB Error: ", error);

    return {
      status: "error",
      error: { "": ["デバイス情報の更新に失敗しました。"] },
    };
  }

  revalidateTag(`device-${deviceId}`, "max");
  revalidateTag(`devices-${user.id}`, "max");
  revalidatePath("/devices");

  redirect(`/devices/${deviceId}?updated=1`);
}

export async function deleteDevice(deviceId: string) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return {
      error: "ユーザーが見つかりません。",
    };
  }

  const { error } = await supabase
    .from("devices")
    .delete()
    .eq("id", deviceId)
    .eq("user_id", user.id);

  if (error) {
    console.error("DB Error: ", error);

    return {
      error: "デバイスの削除に失敗しました。",
    };
  }

  revalidateTag(`devices-${user.id}`, "max");

  return { success: true };
}
