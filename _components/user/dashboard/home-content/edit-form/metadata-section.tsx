"use client";

import { forwardRef } from "react";
import classNames from "classnames";
import MediaUploader from "@/_components/user/dashboard/media-uploader";
import ImageList from "@/_components/user/dashboard/image-list";
import { deleteImage } from "@/_actions/delete-image-action";

interface Props {
  metaTitle: string;
  setMetaTitle: (v: string) => void;
  metaDescription: string;
  setMetaDescription: (v: string) => void;
  metaKeywords: string;
  setMetaKeywords: (v: string) => void;
  metaImages: string[];
  setMetaImages: React.Dispatch<React.SetStateAction<string[]>>;
  activeSection: string;
  toggleSection: (id: string) => void;
  error?: string;
  onPendingAdd?: (url: string) => void;
  onPendingRemove?: (url: string) => void;
}

const MetaDataSection = forwardRef<HTMLDivElement, Props>(
  function MetaDataSection(
    {
      metaTitle,
      setMetaTitle,
      metaDescription,
      setMetaDescription,
      metaKeywords,
      setMetaKeywords,
      metaImages,
      setMetaImages,
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
          onClick={() => toggleSection("meta")}
          className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <span
              className={classNames("text-subheading", {
                "text-error": error,
              })}
            >
              Metadata
            </span>
            {error && <span className="text-error text-smallest">{error}</span>}
          </span>
          <span>{activeSection === "meta" ? "−" : "+"}</span>
        </button>
        {activeSection === "meta" && (
          <div className="flex flex-col gap-3 p-4 border-t border-black">
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Meta Title *</span>
              <span className="text-smallest text-black/60 italic">
                The title of this page as it appears in Google search results
                and browser tabs. Keep it under 60 characters and include the
                website name.
              </span>
              <input
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="border border-black rounded p-2"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-semibold">Meta Description *</span>
              <span className="text-smallest text-black/60 italic">
                A short summary of this page shown under the title in Google
                search results. Aim for 1–2 sentences (under 160 characters)
                that describe what the website offers.
              </span>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="border border-black rounded p-2"
                rows={3}
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-semibold"> (optional)</span>
              <span className="text-smallest text-black/60 italic">
                A comma-separated list of words or phrases relevant to this page
                (e.g. "retirement home, assisted living, Cape Town"). These help
                with search engine visibility.
              </span>
              <input
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
                className="border border-black rounded p-2"
              />
            </label>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <span className="font-semibold">Meta Images (optional)</span>
                <span className="text-smallest text-black/60 italic">
                  Images that appear when this page is shared on social media
                  (e.g. Facebook, WhatsApp). Use a clear, high-quality image
                  that represents the website.
                </span>
              </div>
              <ImageList
                urls={metaImages}
                onRemove={(url) => {
                  deleteImage(url);
                  onPendingRemove?.(url);
                  setMetaImages((prev) => prev.filter((img) => img !== url));
                }}
              />
              <MediaUploader
                storagePath="home/meta"
                onUploaded={(url) => setMetaImages((prev) => [...prev, url])}
                multiple
                onPendingAdd={onPendingAdd}
              />
            </div>
          </div>
        )}
        <input type="hidden" name="metaTitle" value={metaTitle} />
        <input type="hidden" name="metaDescription" value={metaDescription} />
        <input type="hidden" name="metaKeywords" value={metaKeywords} />
        <input
          type="hidden"
          name="metaImages"
          value={JSON.stringify(metaImages)}
        />
      </div>
    );
  },
);

export default MetaDataSection;
