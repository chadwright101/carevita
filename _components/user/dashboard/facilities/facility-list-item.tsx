"use client";

import { useState, useActionState, useEffect } from "react";
import Link from "next/link";
import classNames from "classnames";
import { Facility } from "@/_types/facility-types";
import { deleteFacility } from "@/_actions/admin-facilities-actions";
import ButtonType from "@/_components/ui/button-type";
import { buttonStyles } from "@/_styles/button-styles";

interface Props {
  facility: Facility;
  onDeactivate: (slug: string) => void;
}

const initialState = { success: false, error: "" };

export default function FacilityListItem({
  facility,
  onDeactivate,
}: Props) {
  const [confirming, setConfirming] = useState(false);
  const [deleteState, deleteAction] = useActionState(
    deleteFacility,
    initialState,
  );

  useEffect(() => {
    if (deleteState.success) onDeactivate(facility.general.slug);
  }, [deleteState.success]);

  return (
    <li
      className={classNames(
        "flex flex-col border border-black rounded-md overflow-hidden scroll-mt-20",
        confirming ? "bg-error/10" : "bg-white",
      )}
    >
      <div className="flex flex-col gap-5 p-4 tablet:items-center tablet:flex-row tablet:justify-between">
        <div className="flex flex-col tablet:items-center tablet:flex-row gap-3">
          <p className="font-medium">{facility.general.title}</p>
          <p className="text-smaller text-black opacity-60">
            {facility.general.region}
          </p>
        </div>
        <div className="flex flex-col gap-5 tablet:gap-2">
          {!deleteState.error && (
            <p className="text-smallest text-error tablet:max-w-[300px]">
              {deleteState.error}
            </p>
          )}

          <div className="flex flex-col tablet:items-center tablet:flex-row gap-2">
            {!confirming && (
              <Link
                href={`/dashboard/facilities/${facility.general.slug}`}
                className={buttonStyles(undefined, false, false, undefined, "button", "black")}
              >
                Edit
              </Link>
            )}
            {confirming ? (
              <div className="flex flex-col gap-5">
                <p className="text-smaller text-error">
                  Are you sure you want to deactivate this facility?
                </p>
                <div className="flex flex-col gap-2 tablet:flex-row tablet:justify-end">
                  <form action={deleteAction}>
                    <input
                      type="hidden"
                      name="slug"
                      value={facility.general.slug}
                    />
                    <ButtonType
                      strokeColor="red"
                      cssClasses="w-full tablet:w-auto"
                      blackSpinner
                    >
                      Confirm
                    </ButtonType>
                  </form>
                  <ButtonType
                    type="button"
                    strokeColor="black"
                    onClick={() => setConfirming(false)}
                  >
                    Cancel
                  </ButtonType>
                </div>
              </div>
            ) : (
              <ButtonType
                type="button"
                strokeColor="red"
                onClick={() => setConfirming(true)}
              >
                Deactivate
              </ButtonType>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
