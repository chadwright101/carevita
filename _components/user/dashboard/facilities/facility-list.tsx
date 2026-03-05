"use client";

import { useState, useActionState } from "react";
import { Facility } from "@/_types/facility-types";
import { reorderFacilities } from "@/_actions/admin-facilities-actions";
import FacilityListItem from "./facility-list-item";
import ButtonType from "@/_components/ui/button-type";

interface Props {
  facilities: Facility[];
}

const initialState = { success: false, error: "" };

export default function FacilityList({ facilities }: Props) {
  const [ordered, setOrdered] = useState(facilities);
  const [state, formAction] = useActionState(reorderFacilities, initialState);

  function move(index: number, direction: -1 | 1) {
    const next = [...ordered];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setOrdered(next);
  }

  const orderPayload = JSON.stringify(
    ordered.map((f, i) => ({ slug: f.general.slug, order: i + 1 })),
  );

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-3">
        {ordered.map((facility, index) => (
          <div key={facility.general.slug} className="flex gap-2">
            <div className="grid gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className="px-5 text-smallest border border-black rounded tablet:px-3 disabled:opacity-30 desktop:hover:cursor-pointer"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === ordered.length - 1}
                className="px-5 text-smallest border border-black rounded tablet:px-3 disabled:opacity-30 desktop:hover:cursor-pointer"
              >
                ↓
              </button>
            </div>
            <div className="flex-1">
              <FacilityListItem
                facility={facility}
                onDeactivate={(slug) =>
                  setOrdered((prev) =>
                    prev.filter((f) => f.general.slug !== slug),
                  )
                }
              />
            </div>
          </div>
        ))}
      </ul>
      <form action={formAction}>
        <input type="hidden" name="order" value={orderPayload} />
        {state.error && (
          <p className="text-error text-smallest mb-2">{state.error}</p>
        )}
        {state.success && (
          <p className="text-green text-smallest mb-2">Order saved</p>
        )}
        <ButtonType>Save Order</ButtonType>
      </form>
    </div>
  );
}
