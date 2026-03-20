"use client";

import classNames from "classnames";
import { forwardRef } from "react";
import MediaUploader from "@/_components/user/dashboard/media-uploader";
import MapCoordinatesTooltip from "@/_lib/utils/map-coordinates-tooltip";
import RichTextEditor from "@/_components/ui/forms/rich-text-editor";

interface Props {
  facilitySlug: string;
  description: string;
  setDescription: (v: string) => void;
  contactImage: string;
  setContactImage: (v: string) => void;
  mapLat: string;
  setMapLat: (v: string) => void;
  mapLng: string;
  setMapLng: (v: string) => void;
  activeSection: string;
  toggleSection: (id: string) => void;
  error?: string;
}

const LocationSection = forwardRef<HTMLDivElement, Props>(
  function LocationSection(
    {
      facilitySlug,
      description,
      setDescription,
      contactImage,
      setContactImage,
      mapLat,
      setMapLat,
      mapLng,
      setMapLng,
      activeSection,
      toggleSection,
      error,
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className="border border-black rounded-md overflow-hidden scroll-mt-24"
      >
        <button
          type="button"
          onClick={() => toggleSection("location")}
          className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <span
              className={classNames("text-subheading", { "text-error": error })}
            >
              Location
            </span>
            {error && <span className="text-error text-smallest">{error}</span>}
          </span>
          <span>{activeSection === "location" ? "−" : "+"}</span>
        </button>
        {activeSection === "location" && (
          <div className="flex flex-col gap-3 p-4 border-t border-black">
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Description *</span>
              <RichTextEditor
                value={description}
                onChange={setDescription}
                minHeight="min-h-64"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-semibold">Image *</span>
              <MediaUploader
                storagePath={`facilities/${facilitySlug}/contact`}
                onUploaded={setContactImage}
                currentUrl={contactImage}
                showPreview
                replaceMode={!!contactImage}
              />
            </div>

            <div className="flex flex-col gap-3 mt-5">
              <div className="flex gap-2">
                <span className="font-subheading">Google Map Coordinates</span>
                <MapCoordinatesTooltip />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1">
                  <span className="font-semibold">Latitude *</span>
                  <input
                    value={mapLat}
                    onChange={(e) => setMapLat(e.target.value)}
                    className="border border-black rounded p-2"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="font-semibold">Longitude *</span>
                  <input
                    value={mapLng}
                    onChange={(e) => setMapLng(e.target.value)}
                    className="border border-black rounded p-2"
                  />
                </label>
              </div>
            </div>
          </div>
        )}
        <input type="hidden" name="description" value={description} />
        <input type="hidden" name="locationImage" value={contactImage} />
        <input type="hidden" name="mapLat" value={mapLat} />
        <input type="hidden" name="mapLng" value={mapLng} />
      </div>
    );
  },
);

export default LocationSection;
