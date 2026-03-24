"use client";

import classNames from "classnames";
import { forwardRef } from "react";
import MediaUploader from "@/_components/user/dashboard/media-uploader";

interface Props {
  facilitySlug: string;
  ourHomesDescription: string;
  setOurHomesDescription: (v: string) => void;
  ourHomesImage: string;
  setOurHomesImage: (v: string) => void;
  activeSection: string;
  toggleSection: (id: string) => void;
  error?: string;
  onPendingAdd?: (url: string) => void;
  onPendingRemove?: (url: string) => void;
}

const OurHomesPageSection = forwardRef<HTMLDivElement, Props>(
  function OurHomesPageSection(
    {
      facilitySlug,
      ourHomesDescription,
      setOurHomesDescription,
      ourHomesImage,
      setOurHomesImage,
      activeSection,
      toggleSection,
      error,
      onPendingAdd,
      onPendingRemove,
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
          onClick={() => toggleSection("ourHomesPage")}
          className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <span
              className={classNames("text-subheading", {
                "text-error": error,
              })}
            >
              Our Homes Page
            </span>
            {error && <span className="text-error text-smallest">{error}</span>}
          </span>
          <span>{activeSection === "ourHomesPage" ? "−" : "+"}</span>
        </button>
        {activeSection === "ourHomesPage" && (
          <div className="flex flex-col gap-10 px-5 py-7 border-t border-black">
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Description *</span>
              <textarea
                name="ourHomesDescription"
                value={ourHomesDescription}
                onChange={(e) => setOurHomesDescription(e.target.value)}
                rows={4}
                className="border border-black rounded-md p-2"
              />
            </div>
            <div className="flex flex-col gap-5">
              <span className="font-semibold">Image *</span>
              <MediaUploader
                storagePath={`facilities/${facilitySlug}/our-homes-page`}
                onUploaded={setOurHomesImage}
                currentUrl={ourHomesImage}
                showPreview
                replaceMode={!!ourHomesImage}
                onPendingAdd={onPendingAdd}
                onPendingRemove={onPendingRemove}
              />
            </div>
          </div>
        )}
        <input type="hidden" name="ourHomesDescription" value={ourHomesDescription} />
        <input type="hidden" name="ourHomesImage" value={ourHomesImage} />
      </div>
    );
  },
);

export default OurHomesPageSection;
