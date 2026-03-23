"use client";

import classNames from "classnames";
import { forwardRef } from "react";
import MediaUploader from "@/_components/user/dashboard/media-uploader";
import ImageList from "@/_components/user/dashboard/image-list";
import { deleteImage } from "@/_actions/delete-image-action";

interface Props {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  activeSection: string;
  toggleSection: (id: string) => void;
  error?: string;
}

const GallerySection = forwardRef<HTMLDivElement, Props>(
  function GallerySection(
    { images, setImages, activeSection, toggleSection, error },
    ref,
  ) {

    return (
      <div
        ref={ref}
        className="border border-black rounded-md overflow-hidden scroll-mt-24"
      >
        <button
          type="button"
          onClick={() => toggleSection("slider")}
          className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <span
              className={classNames("text-subheading", { "text-error": error })}
            >
              Gallery
            </span>
            {error && <span className="text-error text-smallest">{error}</span>}
          </span>
          <span>{activeSection === "slider" ? "−" : "+"}</span>
        </button>
        {activeSection === "slider" && (
          <div className="flex flex-col gap-5 px-5 py-7 border-t border-black">
            <span className="font-semibold">Home Slider</span>
            {images.length === 0 && (
              <span className="text-black/70 italic text-smallest">
                Slider empty
              </span>
            )}
            <div className="flex flex-col gap-5">
              <ImageList
                urls={images}
                onRemove={(url) => {
                  deleteImage(url);
                  setImages((prev) => prev.filter((img) => img !== url));
                }}
                onMove={(index, direction) => {
                  setImages((prev) => {
                    const next = [...prev];
                    const target = index + direction;
                    if (target < 0 || target >= next.length) return prev;
                    [next[index], next[target]] = [next[target], next[index]];
                    return next;
                  });
                }}
              />
              <MediaUploader
                storagePath="home/slider"
                onUploaded={(url) => setImages((prev) => [...prev, url])}
                multiple
                maxFiles={3}
              />
            </div>
          </div>
        )}
        <input
          type="hidden"
          name="ourHomesSliderHomePage"
          value={JSON.stringify(images)}
        />
      </div>
    );
  },
);

export default GallerySection;
