"use client";

import { useState, useTransition } from "react";
import { Facility } from "@/_types/facility-types";
import { updateFacilityOrder } from "@/_actions/admin-facilities-actions";
import FacilityListItem from "./facility-list-item";
import ReorderButtons from "../reorder-buttons";

interface Props {
  facilities: Facility[];
}

export default function FacilityList({ facilities }: Props) {
  const [ordered, setOrdered] = useState(facilities);
  const [isPending, startTransition] = useTransition();

  function move(index: number, direction: -1 | 1) {
    const next = [...ordered];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setOrdered(next);

    const payload = next.map((f, i) => ({
      slug: f.general.slug,
      order: i + 1,
    }));
    startTransition(() => {
      updateFacilityOrder(payload);
    });
  }

  return (
    <ul className="grid gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
      {ordered.map((facility, index) => (
        <div
          key={facility.general.slug}
          className="flex gap-5 p-5 border border-black/75 rounded"
        >
          <div className="flex-1">
            <FacilityListItem
              facility={facility}
              onDeactivate={(slug) =>
                setOrdered((prev) =>
                  prev.filter((f) => f.general.slug !== slug),
                )
              }
              index={index}
            />
          </div>
          <div>
            <ReorderButtons
              index={index}
              total={ordered.length}
              onMove={(direction) => move(index, direction)}
              disabled={isPending}
            />
          </div>
        </div>
      ))}
    </ul>
  );
}
