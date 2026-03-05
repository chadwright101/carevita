"use client";

import { useState, useActionState } from "react";
import { createFacility } from "@/_actions/admin-facilities-actions";
import ButtonType from "@/_components/ui/button-type";

const initialState = { success: false, error: "" };

export default function FacilityAddForm() {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(createFacility, initialState);

  return (
    <div>
      <ButtonType type="button" backgroundColor="green" onClick={() => setOpen((prev) => !prev)}>
        {open ? "Cancel" : "Add Facility"}
      </ButtonType>

      {open && (
        <form action={formAction} className="flex flex-col gap-4 mt-4 p-4 border border-black rounded-md">
          <h3>New Facility</h3>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Slug (doc ID)</span>
              <input name="slug" required className="border border-black rounded p-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Short Title</span>
              <input name="shortTitle" required className="border border-black rounded p-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Title</span>
              <input name="title" required className="border border-black rounded p-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Extended Title</span>
              <input name="extendedTitle" required className="border border-black rounded p-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Location</span>
              <input name="location" required className="border border-black rounded p-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Extended Location</span>
              <input name="extendedLocation" required className="border border-black rounded p-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Region</span>
              <select name="region" className="border border-black rounded p-2 desktop:hover:cursor-pointer">
                <option value="WC">Western Cape</option>
                <option value="GP">Gauteng</option>
                <option value="EC">Eastern Cape</option>
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Email</span>
              <input name="email" type="email" required className="border border-black rounded p-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Phone</span>
              <input name="phone" required className="border border-black rounded p-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Home URL</span>
              <input name="homeUrl" required className="border border-black rounded p-2" />
            </label>
            <label className="flex flex-col gap-1 col-span-2">
              <span className="text-smallest">Description</span>
              <textarea name="description" required rows={3} className="border border-black rounded p-2" />
            </label>
            <label className="flex flex-col gap-1 col-span-2">
              <span className="text-smallest">Contact Image URL</span>
              <input name="contactImage" required className="border border-black rounded p-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Order</span>
              <input name="order" type="number" defaultValue="0" className="border border-black rounded p-2" />
            </label>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Map Latitude</span>
              <input name="mapLat" required className="border border-black rounded p-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Map Longitude</span>
              <input name="mapLng" required className="border border-black rounded p-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Map Zoom</span>
              <input name="mapZoom" defaultValue="14" className="border border-black rounded p-2" />
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

          {state.error && <p className="text-error text-smallest">{state.error}</p>}
          {state.success && <p className="text-green text-smallest">Facility created</p>}

          <ButtonType cssClasses="self-start">Create Facility</ButtonType>
        </form>
      )}
    </div>
  );
}
