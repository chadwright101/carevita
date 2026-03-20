"use client";

import classNames from "classnames";
import { forwardRef } from "react";
import MediaUploader from "@/_components/user/dashboard/media-uploader";
import RichTextEditor from "@/_components/ui/forms/rich-text-editor";

interface Props {
  facilitySlug: string;
  whatWeOfferList: string;
  setWhatWeOfferList: (v: string) => void;
  whatWeOfferImage: string;
  setWhatWeOfferImage: (v: string) => void;
  activeSection: string;
  toggleSection: (id: string) => void;
  error?: string;
}

const WhatWeOfferSection = forwardRef<HTMLDivElement, Props>(
  function WhatWeOfferSection(
    {
      facilitySlug,
      whatWeOfferList,
      setWhatWeOfferList,
      whatWeOfferImage,
      setWhatWeOfferImage,
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
          onClick={() => toggleSection("whatWeOffer")}
          className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <span
              className={classNames("text-subheading", { "text-error": error })}
            >
              What We Offer
            </span>
            {error && <span className="text-error text-smallest">{error}</span>}
          </span>
          <span>{activeSection === "whatWeOffer" ? "−" : "+"}</span>
        </button>
        {activeSection === "whatWeOffer" && (
          <div className="flex flex-col gap-10 px-5 py-7 border-t border-black">
            <div className="flex flex-col gap-5">
              <span className="font-semibold">Offerings *</span>
              <RichTextEditor
                value={whatWeOfferList}
                onChange={setWhatWeOfferList}
              />
            </div>
            <div className="flex flex-col gap-5">
              <span className="font-semibold">Image *</span>
              <MediaUploader
                storagePath={`facilities/${facilitySlug}/what-we-offer`}
                onUploaded={setWhatWeOfferImage}
                currentUrl={whatWeOfferImage}
                showPreview
                replaceMode={!!whatWeOfferImage}
              />
            </div>
          </div>
        )}
        <input type="hidden" name="whatWeOfferList" value={whatWeOfferList} />
        <input type="hidden" name="whatWeOfferImage" value={whatWeOfferImage} />
      </div>
    );
  },
);

export default WhatWeOfferSection;
