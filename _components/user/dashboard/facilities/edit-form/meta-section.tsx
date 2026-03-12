"use client";

import Image from "next/image";
import ImageUploader from "@/_components/user/dashboard/image-uploader";
import { deleteImage } from "@/_actions/delete-image-action";

interface Props {
  facilitySlug: string;
  metaKeywords: string;
  setMetaKeywords: (v: string) => void;
  metaImages: string[];
  setMetaImages: React.Dispatch<React.SetStateAction<string[]>>;
  activeSection: string;
  toggleSection: (id: string) => void;
}

export default function MetaSection({
  facilitySlug,
  metaKeywords,
  setMetaKeywords,
  metaImages,
  setMetaImages,
  activeSection,
  toggleSection,
}: Props) {
  return (
    <div className="border border-black rounded-md overflow-hidden">
      <button
        type="button"
        onClick={() => toggleSection("meta")}
        className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
      >
        <span className="text-subheading">Meta</span>
        <span>{activeSection === "meta" ? "−" : "+"}</span>
      </button>
      {activeSection === "meta" && (
        <div className="flex flex-col gap-3 p-4 border-t border-black">
          <label className="flex flex-col gap-1">
            <span className="text-smallest">Meta Keywords</span>
            <input
              value={metaKeywords}
              onChange={(e) => setMetaKeywords(e.target.value)}
              className="border border-black rounded p-2"
            />
          </label>

          <div className="flex flex-col gap-3">
            <span className="text-smallest">Meta Images</span>
            {metaImages.map((url, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <div className="flex-1" />
                  <button
                    type="button"
                    onClick={() => {
                      deleteImage(url);
                      setMetaImages((prev) => prev.filter((_, j) => j !== i));
                    }}
                    className="desktop:hover:cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
                {url && (
                  <div className="relative w-20 h-14 overflow-hidden rounded">
                    <Image src={url} alt="" fill className="object-cover" />
                  </div>
                )}
              </div>
            ))}
            <ImageUploader
              storagePath={`facilities/${facilitySlug}/meta`}
              onUploaded={(url) => setMetaImages((prev) => [...prev, url])}
            />
          </div>
        </div>
      )}
      <input type="hidden" name="metaKeywords" value={metaKeywords} />
      <input
        type="hidden"
        name="metaImages"
        value={JSON.stringify(metaImages)}
      />
    </div>
  );
}
