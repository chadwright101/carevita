"use client";

import { useActionState } from "react";
import { updateHomeContact } from "@/_actions/admin-home-actions";
import ButtonType from "@/_components/ui/button-type";

interface Props {
  contact: { general: string; accounts: string };
}

const initialState = { success: false, error: "" };

export default function EditContactForm({ contact }: Props) {
  const [state, formAction] = useActionState(updateHomeContact, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3 p-4 border border-black rounded-md">
      <h3>Contact</h3>
      <label className="flex flex-col gap-1">
        <span className="text-smallest">General Email</span>
        <input
          name="contactGeneral"
          defaultValue={contact.general}
          className="border border-black rounded p-2"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-smallest">Accounts Email</span>
        <input
          name="contactAccounts"
          defaultValue={contact.accounts}
          className="border border-black rounded p-2"
        />
      </label>
      {state.error && <p className="text-error text-smallest">{state.error}</p>}
      {state.success && <p className="text-green text-smallest">Saved successfully</p>}
      <ButtonType cssClasses="self-start">Save Contact</ButtonType>
    </form>
  );
}
