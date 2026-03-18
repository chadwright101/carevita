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
  index: number;
}

const initialState = { success: false, error: "" };

export default function FacilityListItem({
  facility,
  onDeactivate,
  index,
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
    <li className="flex flex-col scroll-mt-20 bg-white">
      <div className="flex flex-col items-start gap-3 relative">
        <p>
          <span className="mr-1">{index + 1}.</span>
          {facility.general.facilityName}
        </p>
        <div className="flex flex-col gap-5 tablet:gap-2">
          {!deleteState.error && (
            <p className="text-smallest text-error tablet:max-w-[300px]">
              {deleteState.error}
            </p>
          )}

          <div className="flex gap-3">
            {!confirming && (
              <Link
                href={`/dashboard/facilities/${facility.general.slug}`}
                className={classNames(
                  "w-full",
                  buttonStyles(
                    undefined,
                    false,
                    false,
                    undefined,
                    "button",
                    "black",
                  ),
                )}
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
                cssClasses="w-full"
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
