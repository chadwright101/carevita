"use client";

import { useActionState } from "react";
import { updateHomeServices } from "@/_actions/admin-home-actions";
import ButtonType from "@/_components/ui/button-type";
import { Service } from "@/_types/general-types";

interface Props {
  services: Service[];
}

const initialState = { success: false, error: "" };

export default function EditServicesForm({ services }: Props) {
  const [state, formAction] = useActionState(updateHomeServices, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3 p-4 border border-black rounded-md">
      <h3>Services</h3>
      <input type="hidden" name="services" value={JSON.stringify(services)} />
      <p className="text-smallest">Services editing is handled via JSON. Current count: {services.length}</p>
      {state.error && <p className="text-error text-smallest">{state.error}</p>}
      {state.success && <p className="text-green text-smallest">Saved successfully</p>}
      <ButtonType cssClasses="self-start">Save Services</ButtonType>
    </form>
  );
}
