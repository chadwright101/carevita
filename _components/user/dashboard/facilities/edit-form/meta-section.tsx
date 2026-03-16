"use client";

import MediaUploader from "@/_components/user/dashboard/media-uploader";
import ImageList from "@/_components/user/dashboard/image-list";
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
            <span className="font-semibold">Meta Keywords</span>
            <input
              value={metaKeywords}
              onChange={(e) => setMetaKeywords(e.target.value)}
              className="border border-black rounded p-2"
            />
          </label>

          <div className="flex flex-col gap-3">
            <span className="font-semibold">Meta Images</span>
            <ImageList
              urls={metaImages}
              onRemove={(url) => {
                deleteImage(url);
                setMetaImages((prev) => prev.filter((img) => img !== url));
              }}
            />
            <MediaUploader
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
