"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import Spinner from "@/components/ui/Spinner";
import { useFormResultToast } from "@/hooks/useFormResultToast";
import { FormState } from "@/types";

import { registerDevice } from "../../_actions/device";
import DeviceForm from "../../_components/DeviceForm";
import { useDeviceDraftStore } from "../../_stores/useDeviceDraftStore";

interface IAddDeviceFrom {
  isAlreadyMainDevice: boolean;
}

const AddDeviceForm = ({ isAlreadyMainDevice }: IAddDeviceFrom) => {
  const router = useRouter();

  const draft = useDeviceDraftStore((state) => state.draft);

  const registerWithDraft = async (
    prevState: FormState,
    formData: FormData,
  ) => {
    if (!draft) {
      return prevState;
    }
    return registerDevice(draft, prevState, formData);
  };

  const [lastResult, action, isPending] = useActionState(
    registerWithDraft,
    undefined,
  );

  useEffect(() => {
    if (!draft && !isPending) {
      router.push("/devices/search");
    }
  }, [draft, isPending, router]);

  useFormResultToast(lastResult, { showSuccessToast: false });

  if (!draft) {
    return <Spinner className="py-8" />;
  }

  return (
    <DeviceForm
      initialData={draft}
      candidateColors={draft.candidate_colors}
      candidateStorages={draft.candidate_storages}
      action={action}
      lastResult={lastResult}
      submitLabel="登録する"
      isPending={isPending}
      isAlreadyMainDevice={isAlreadyMainDevice}
    />
  );
};

export default AddDeviceForm;
