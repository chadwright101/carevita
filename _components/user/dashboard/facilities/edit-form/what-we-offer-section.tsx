import { useState } from "react";
import Image from "next/image";
import RichTextEditor from "@/_components/ui/forms/rich-text-editor";

interface Props {
  whatWeOfferList: string;
  whatWeOfferImage: string;
  setWhatWeOfferImage: (v: string) => void;
  activeSection: string;
  toggleSection: (id: string) => void;
}

export default function WhatWeOfferSection({
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
        <div className="flex flex-col gap-3 p-4 border-t border-black">
          <span className="text-smallest">Offer List</span>
          <RichTextEditor
            value={content}
            onChange={setContent}
            toolbarButtons={["bold", "italic", "bulletList"]}
          />
          <label className="flex flex-col gap-1">
            <span className="text-smallest">Offer Image URL</span>
            <input
              value={whatWeOfferImage}
              onChange={(e) => setWhatWeOfferImage(e.target.value)}
              className="border border-black rounded p-2"
            />
            {whatWeOfferImage && (
              <div className="relative w-20 h-14 overflow-hidden rounded">
                <Image
                  src={whatWeOfferImage}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </label>
        </div>
      )}
      <input
        type="hidden"
        name="whatWeOfferList"
        value={content}
      />
      <input
        type="hidden"
        name="whatWeOfferImage"
        value={whatWeOfferImage}
      />
    </div>
  );
}
