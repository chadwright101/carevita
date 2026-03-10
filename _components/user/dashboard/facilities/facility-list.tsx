"use client";

import { useState, useTransition } from "react";
import { Facility } from "@/_types/facility-types";
import { updateFacilityOrder } from "@/_actions/admin-facilities-actions";
import FacilityListItem from "./facility-list-item";
import classNames from "classnames";

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

    const payload = next.map((f, i) => ({ slug: f.general.slug, order: i + 1 }));
    startTransition(() => {
      updateFacilityOrder(payload);
    });
  }

  return (
    <ul className="flex flex-col gap-3">
      {ordered.map((facility, index) => (
        <div key={facility.general.slug} className="flex gap-2">
          <div className="grid gap-1">
            <button
              type="button"
              onClick={() => move(index, -1)}
              disabled={index === 0 || isPending}
              className={classNames(
                "px-5 text-smallest border border-black rounded tablet:px-3 disabled:opacity-30 desktop:hover:cursor-pointer",
                {
                  "hover:desktop:cursor-not-allowed": index === 0,
                },
              )}
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => move(index, 1)}
              disabled={index === ordered.length - 1 || isPending}
              className={classNames(
                "px-5 text-smallest border border-black rounded tablet:px-3 disabled:opacity-30 desktop:hover:cursor-pointer",
                {
                  "hover:desktop:cursor-not-allowed":
                    index === ordered.length - 1,
                },
              )}
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
  );
}
