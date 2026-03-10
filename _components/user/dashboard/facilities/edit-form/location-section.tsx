"use client";

import Image from "next/image";
import MapCoordinatesTooltip from "@/_lib/utils/map-coordinates-tooltip";
import RichTextEditor from "@/_components/ui/forms/rich-text-editor";

interface Props {
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
}

export default function LocationSection({
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
}: Props) {
  return (
    <div className="border border-black rounded-md overflow-hidden">
      <button
        type="button"
        onClick={() => toggleSection("location")}
        className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
      >
        <span className="text-subheading">Location</span>
        <span>{activeSection === "location" ? "−" : "+"}</span>
      </button>
      {activeSection === "location" && (
        <div className="flex flex-col gap-3 p-4 border-t border-black">
          <div className="flex flex-col gap-1">
            <span className="text-smallest">Description</span>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              minHeight="min-h-64"
            />
          </div>

          <label className="flex flex-col gap-1">
            <span className="text-smallest">Contact Image URL</span>
            <input
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

          <div className="flex items-center gap-2">
            <MapCoordinatesTooltip />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Latitude</span>
              <input
                value={mapLat}
                onChange={(e) => setMapLat(e.target.value)}
                className="border border-black rounded p-2"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-smallest">Longitude</span>
              <input
                value={mapLng}
                onChange={(e) => setMapLng(e.target.value)}
                className="border border-black rounded p-2"
              />
            </label>
          </div>
        </div>
      )}
      <input type="hidden" name="description" value={description} />
      <input type="hidden" name="contactImage" value={contactImage} />
      <input type="hidden" name="mapLat" value={mapLat} />
      <input type="hidden" name="mapLng" value={mapLng} />
    </div>
  );
}
