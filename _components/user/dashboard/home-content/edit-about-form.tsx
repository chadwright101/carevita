"use client";

import { useActionState } from "react";
import { updateHomeAbout } from "@/_actions/admin-home-actions";
import ButtonType from "@/_components/ui/button-type";

interface Props {
  about: { content: string };
}

const initialState = { success: false, error: "" };

export default function EditAboutForm({ about }: Props) {
  const [state, formAction] = useActionState(updateHomeAbout, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3 p-4 border border-black rounded-md">
      <h3>About</h3>
      <label className="flex flex-col gap-1">
        <span className="text-smallest">Content</span>
        <textarea
          name="aboutContent"
          defaultValue={about.content}
          rows={6}
          className="border border-black rounded p-2"
        />
      </label>
      {state.error && <p className="text-error text-smallest">{state.error}</p>}
      {state.success && <p className="text-green text-smallest">Saved successfully</p>}
      <ButtonType cssClasses="self-start">Save About</ButtonType>
    </form>
  );
}
