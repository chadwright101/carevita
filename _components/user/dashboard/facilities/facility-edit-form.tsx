"use client";

import { useActionState } from "react";
import { Facility } from "@/_types/facility-types";
import { updateFacility } from "@/_actions/admin-facilities-actions";
import ButtonType from "@/_components/ui/button-type";

interface Props {
  facility: Facility;
}

const initialState = { success: false, error: "" };

export default function FacilityEditForm({ facility }: Props) {
  const [state, formAction] = useActionState(updateFacility, initialState);
  const { general, whatWeOffer, about, meetTheTeam, images, order, isActive } = facility;

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="slug" value={general.slug} />
      <input type="hidden" name="isActive" value={String(isActive)} />
      <input type="hidden" name="order" value={String(order)} />
      <input type="hidden" name="heroSlider" value={JSON.stringify(images.heroSlider)} />

      <fieldset className="flex flex-col gap-3">
        <legend className="text-subheading mb-2">General</legend>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-smallest">Short Title</span>
            <input name="shortTitle" defaultValue={general.shortTitle} className="border border-black rounded p-2" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-smallest">Title</span>
            <input name="title" defaultValue={general.title} className="border border-black rounded p-2" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-smallest">Extended Title</span>
            <input name="extendedTitle" defaultValue={general.extendedTitle} className="border border-black rounded p-2" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-smallest">Location</span>
            <input name="location" defaultValue={general.location} className="border border-black rounded p-2" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-smallest">Extended Location</span>
            <input name="extendedLocation" defaultValue={general.extendedLocation} className="border border-black rounded p-2" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-smallest">Region</span>
            <select name="region" defaultValue={general.region} className="border border-black rounded p-2 desktop:hover:cursor-pointer">
              <option value="WC">Western Cape</option>
              <option value="GP">Gauteng</option>
              <option value="EC">Eastern Cape</option>
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-smallest">Email</span>
            <input name="email" defaultValue={general.email} className="border border-black rounded p-2" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-smallest">Phone</span>
            <input name="phone" defaultValue={general.phone} className="border border-black rounded p-2" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-smallest">Home URL</span>
            <input name="homeUrl" defaultValue={general.homeUrl} className="border border-black rounded p-2" />
          </label>
          <label className="flex flex-col gap-1 col-span-2">
            <span className="text-smallest">Description</span>
            <textarea name="description" defaultValue={general.description} rows={3} className="border border-black rounded p-2" />
          </label>
          <label className="flex flex-col gap-1 col-span-2">
            <span className="text-smallest">Contact Image URL</span>
            <input name="contactImage" defaultValue={general.contactImage} className="border border-black rounded p-2" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-smallest">Meta Keywords</span>
            <input name="metaKeywords" defaultValue={general.meta.keywords} className="border border-black rounded p-2" />
          </label>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="text-subheading mb-2">Map</legend>
        <div className="grid grid-cols-3 gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-smallest">Latitude</span>
            <input name="mapLat" defaultValue={String(general.map.lat)} className="border border-black rounded p-2" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-smallest">Longitude</span>
            <input name="mapLng" defaultValue={String(general.map.lng)} className="border border-black rounded p-2" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-smallest">Zoom</span>
            <input name="mapZoom" defaultValue={String(general.map.zoom)} className="border border-black rounded p-2" />
          </label>
        </div>
      </fieldset>

      <input type="hidden" name="whatWeOfferList" value={JSON.stringify(whatWeOffer.list)} />
      <input type="hidden" name="whatWeOfferImage" value={whatWeOffer.image} />
      <input type="hidden" name="pampering" value={JSON.stringify(whatWeOffer.pampering || [])} />
      <input type="hidden" name="weeklyActivities" value={JSON.stringify(whatWeOffer.weeklyActivities || [])} />
      <input type="hidden" name="aboutParagraphs" value={JSON.stringify(about.paragraphs)} />
      <input type="hidden" name="aboutImage" value={about.image} />
      <input type="hidden" name="meetTheTeam" value={JSON.stringify(meetTheTeam || [])} />
      <input type="hidden" name="gallerySlider" value={JSON.stringify(images.gallerySlider)} />
      <input type="hidden" name="metaImages" value={JSON.stringify(general.meta.images)} />

      {state.error && <p className="text-error text-smallest">{state.error}</p>}
      {state.success && <p className="text-green text-smallest">Saved successfully</p>}

      <ButtonType cssClasses="self-start">Save Changes</ButtonType>
    </form>
  );
}
