"use client";

import { useState } from "react";
import MediaUploader from "@/_components/user/dashboard/media-uploader";
import RichTextEditor from "@/_components/ui/forms/rich-text-editor";

interface Props {
  facilitySlug: string;
  whatWeOfferList: string;
  whatWeOfferImage: string;
  setWhatWeOfferImage: (v: string) => void;
  activeSection: string;
  toggleSection: (id: string) => void;
}

export default function WhatWeOfferSection({
  facilitySlug,
  whatWeOfferList,
  whatWeOfferImage,
  setWhatWeOfferImage,
  activeSection,
  toggleSection,
}: Props) {
  const [content, setContent] = useState(whatWeOfferList);

  return (
    <div className="border border-black rounded-md overflow-hidden">
      <button
        type="button"
        onClick={() => toggleSection("whatWeOffer")}
        className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
      >
        <span className="text-subheading">What We Offer</span>
        <span>{activeSection === "whatWeOffer" ? "−" : "+"}</span>
      </button>
      {activeSection === "whatWeOffer" && (
        <div className="flex flex-col gap-10 px-5 py-7 border-t border-black">
          <div className="flex flex-col gap-5">
            <span className="font-semibold">Offerings</span>
            <RichTextEditor
              value={content}
              onChange={setContent}
            />
          </div>
          <div className="flex flex-col gap-5">
            <span className="font-semibold">Image</span>
            <MediaUploader
              storagePath={`facilities/${facilitySlug}/what-we-offer`}
              onUploaded={setWhatWeOfferImage}
              currentUrl={whatWeOfferImage}
              showPreview
            />
          </div>
        </div>
      )}
      <input type="hidden" name="whatWeOfferList" value={content} />
      <input type="hidden" name="whatWeOfferImage" value={whatWeOfferImage} />
    </div>
  );
}
