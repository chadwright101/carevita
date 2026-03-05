"use client";

import { useActionState } from "react";
import { uploadImage } from "@/_actions/upload-image-action";
import ButtonType from "@/_components/ui/button-type";

interface Props {
  storagePath: string;
  onUploaded: (url: string) => void;
}

const initialState = { success: false, error: "" };

export default function ImageUploader({ storagePath, onUploaded }: Props) {
  const [state, formAction] = useActionState(
    async (prevState: any, formData: FormData) => {
      const result = await uploadImage(prevState, formData);
      if (result.success && result.data?.url) {
        onUploaded(result.data.url);
      }
      return result;
    },
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="hidden" name="storagePath" value={storagePath} />
      <div className="flex items-center gap-3">
        <input
          type="file"
          name="file"
          accept="image/jpeg,image/png,image/webp"
          className="text-smallest desktop:hover:cursor-pointer"
        />
        <ButtonType backgroundColor="green">Upload</ButtonType>
      </div>
      {state.error && <p className="text-error text-smallest">{state.error}</p>}
      {state.success && <p className="text-green text-smallest">Uploaded</p>}
    </form>
  );
}
