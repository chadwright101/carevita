"use client";

import classNames from "classnames";
import { forwardRef } from "react";
import MediaUploader from "@/_components/user/dashboard/media-uploader";
import ImageList from "@/_components/user/dashboard/image-list";
import { deleteImage } from "@/_actions/delete-image-action";

interface Props {
  facilitySlug: string;
  gallerySliderState: string[];
  setGallerySliderState: React.Dispatch<React.SetStateAction<string[]>>;
  activeSection: string;
  toggleSection: (id: string) => void;
  error?: string;
}

const GallerySection = forwardRef<HTMLDivElement, Props>(
  function GallerySection(
    {
      facilitySlug,
      gallerySliderState,
      setGallerySliderState,
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
          onClick={() => toggleSection("gallery")}
          className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <span
              className={classNames("text-subheading", { "text-error": error })}
            >
              Gallery Slider
            </span>
            {error && <span className="text-error text-smallest">{error}</span>}
          </span>
          <span>{activeSection === "gallery" ? "−" : "+"}</span>
        </button>
        {activeSection === "gallery" && (
          <div className="flex flex-col gap-5 px-5 py-7 border-t border-black">
            <span className="font-semibold">Gallery Slider *</span>
            {gallerySliderState.length === 0 && (
              <span className="text-black/70 italic text-smallest">
                Gallery empty
              </span>
            )}
            <div className="flex flex-col gap-5">
              <ImageList
                urls={gallerySliderState}
                onRemove={(url) => {
                  deleteImage(url);
                  setGallerySliderState((prev) =>
                    prev.filter((img) => img !== url),
                  );
                }}
                onMove={(index, direction) => {
                  setGallerySliderState((prev) => {
                    const next = [...prev];
                    const target = index + direction;
                    if (target < 0 || target >= next.length) return prev;
                    [next[index], next[target]] = [next[target], next[index]];
                    return next;
                  });
                }}
              />
              <MediaUploader
                storagePath={`facilities/${facilitySlug}/gallery-slider`}
                onUploaded={(url) =>
                  setGallerySliderState((prev) => [...prev, url])
                }
                multiple
              />
            </div>
          </div>
        )}
        <input
          type="hidden"
          name="gallerySlider"
          value={JSON.stringify(gallerySliderState)}
        />
      </div>
    );
  },
);

export default GallerySection;
