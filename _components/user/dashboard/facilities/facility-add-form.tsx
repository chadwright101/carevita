"use client";

import { useState, useActionState } from "react";
import Image from "next/image";
import { createFacility } from "@/_actions/admin-facilities-actions";
import ButtonType from "@/_components/ui/button-type";
import MapCoordinatesTooltip from "@/_lib/utils/map-coordinates-tooltip";

const initialState = { success: false, error: "" };

export default function FacilityAddForm() {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(createFacility, initialState);
  const [contactImage, setContactImage] = useState("");

  return (
    <div>
      <ButtonType
        type="button"
        backgroundColor="green"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? "Cancel" : "Add Facility"}
      </ButtonType>

      {open && (
        <form
          action={formAction}
          className="flex flex-col gap-4 mt-4 p-4 border border-black rounded-md"
        >
          <h3>New Facility</h3>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Slug (doc ID)</span>
              <input
                name="slug"
                required
                className="border border-black rounded p-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Facility Name</span>
              <input
                name="title"
                required
                className="border border-black rounded p-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">
                Facility Extended Name (optional)
              </span>
              <input
                name="extendedTitle"
                className="border border-black rounded p-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">City/Town</span>
              <input
                name="city"
                required
                className="border border-black rounded p-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Province</span>
              <select
                name="region"
                className="border border-black rounded p-2 desktop:hover:cursor-pointer"
              >
                <option value="EC">Eastern Cape</option>
                <option value="FS">Free State</option>
                <option value="GP">Gauteng</option>
                <option value="KZN">KwaZulu-Natal</option>
                <option value="LP">Limpopo</option>
                <option value="MP">Mpumalanga</option>
                <option value="NW">North West</option>
                <option value="NC">Northern Cape</option>
                <option value="WC">Western Cape</option>
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Facility Email</span>
              <input
                name="email"
                type="email"
                required
                className="border border-black rounded p-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Facility Phone</span>
              <input
                name="phone"
                required
                defaultValue="+27"
                className="border border-black rounded p-2"
              />
            </label>
            <label className="flex flex-col gap-1 col-span-2">
              <span className="text-smallest">Description</span>
              <textarea
                name="description"
                required
                rows={3}
                className="border border-black rounded p-2"
              />
            </label>
            <label className="flex flex-col gap-1 col-span-2">
              <span className="text-smallest">Contact Image URL</span>
              <input
                name="contactImage"
                required
                value={contactImage}
                onChange={(e) => setContactImage(e.target.value)}
                className="border border-black rounded p-2"
              />
              {contactImage && (
                <div className="relative w-20 h-14 overflow-hidden rounded">
                  <Image src={contactImage} alt="" fill className="object-cover" />
                </div>
              )}
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Order</span>
              <input
                name="order"
                type="number"
                defaultValue="0"
                className="border border-black rounded p-2"
              />
            </label>
          </div>

          <div className="flex items-center gap-2">
            <h3>Map</h3>
            <MapCoordinatesTooltip />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Map Latitude</span>
              <input
                name="mapLat"
                required
                className="border border-black rounded p-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Map Longitude</span>
              <input
                name="mapLng"
                required
                className="border border-black rounded p-2"
              />
            </label>
          </div>

          <input type="hidden" name="metaKeywords" value="" />
          <input type="hidden" name="metaImages" value="[]" />
          <input type="hidden" name="whatWeOfferList" value="[]" />
          <input type="hidden" name="whatWeOfferImage" value="" />
          <input type="hidden" name="pampering" value="[]" />
          <input type="hidden" name="weeklyActivities" value="[]" />
          <input type="hidden" name="aboutParagraphs" value="[]" />
          <input type="hidden" name="aboutImage" value="" />
          <input type="hidden" name="meetTheTeam" value="[]" />
          <input type="hidden" name="heroSlider" value="[]" />
          <input type="hidden" name="gallerySlider" value="[]" />

          {state.error && (
            <p className="text-error text-smallest">{state.error}</p>
          )}
          {state.success && (
            <p className="text-green text-smallest">Facility created</p>
          )}

          <ButtonType cssClasses="self-start">Create Facility</ButtonType>
        </form>
      )}
    </div>
  );
}
