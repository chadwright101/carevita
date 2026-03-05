"use client";

import { useState, useActionState, useEffect } from "react";
import classNames from "classnames";
import { Facility } from "@/_types/facility-types";
import { deleteFacility } from "@/_actions/admin-facilities-actions";
import FacilityEditForm from "./facility-edit-form";
import ButtonType from "@/_components/ui/button-type";

interface Props {
  facility: Facility;
  onDeactivate: (slug: string) => void;
}

const initialState = { success: false, error: "" };

export default function FacilityListItem({ facility, onDeactivate }: Props) {
  const [expanded, setExpanded] = useState(false);
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
        "flex flex-col border border-black rounded-md overflow-hidden",
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
              <ButtonType
                type="button"
                strokeColor="black"
                onClick={() => setExpanded((prev) => !prev)}
              >
                {expanded ? "Close" : "Edit"}
              </ButtonType>
            )}
            {confirming ? (
              <div className="flex flex-col gap-5">
                <p className="text-smaller text-error">
                  Are you sure you want to delete this facility?
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
              !expanded && (
                <ButtonType
                  type="button"
                  strokeColor="red"
                  onClick={() => setConfirming(true)}
                >
                  Deactivate
                </ButtonType>
              )
            )}
          </div>
        </div>
      </div>
      {expanded && (
        <div className="border-t border-black p-4">
          <FacilityEditForm facility={facility} />
        </div>
      )}
    </li>
  );
}
