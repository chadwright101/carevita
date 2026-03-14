"use client";

import ImageUploader from "@/_components/user/dashboard/image-uploader";
import ImageList from "@/_components/user/dashboard/image-list";
import { deleteImage } from "@/_actions/delete-image-action";

interface Props {
  facilitySlug: string;
  heroSliderState: string[];
  setHeroSliderState: React.Dispatch<React.SetStateAction<string[]>>;
  gallerySliderState: string[];
  setGallerySliderState: React.Dispatch<React.SetStateAction<string[]>>;
  activeSection: string;
  toggleSection: (id: string) => void;
}

export default function ImagesSection({
  facilitySlug,
  heroSliderState,
  setHeroSliderState,
  gallerySliderState,
  setGallerySliderState,
  activeSection,
  toggleSection,
}: Props) {
  return (
    <div className="border border-black rounded-md overflow-hidden">
      <button
        type="button"
        onClick={() => toggleSection("images")}
        className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
      >
        <span className="text-subheading">Images</span>
        <span>{activeSection === "images" ? "−" : "+"}</span>
      </button>
      {activeSection === "images" && (
        <div className="flex flex-col gap-5 px-5 py-7 border-t border-black">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5">
              <span className="font-semibold">Hero Slider</span>
              {heroSliderState.length === 0 && (
                <span className="text-black/70 italic text-smallest">
                  Gallery empty
                </span>
              )}
              {heroSliderState.length > 0 && (
                <ImageList
                  urls={heroSliderState}
                  onRemove={(url) => {
                    deleteImage(url);
                    setHeroSliderState((prev) =>
                      prev.filter((img) => img !== url),
                    );
                  }}
                  onMove={(index, direction) => {
                    setHeroSliderState((prev) => {
                      const next = [...prev];
                      const target = index + direction;
                      if (target < 0 || target >= next.length) return prev;
                      [next[index], next[target]] = [next[target], next[index]];
                      return next;
                    });
                  }}
                />
              )}
            </div>
            <ImageUploader
              storagePath={`facilities/${facilitySlug}/hero-slider`}
              onUploaded={(url) => setHeroSliderState((prev) => [...prev, url])}
            />
          </div>
          <hr className="text-black/25" />
          <div className="flex flex-col gap-5">
            <span className="font-semibold">Gallery Slider</span>
            {gallerySliderState.length === 0 && (
              <span className="text-black/70 italic text-smallest">
                Gallery empty
              </span>
            )}
            <div className="flex flex-wrap gap-5">
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
              <ImageUploader
                storagePath={`facilities/${facilitySlug}/gallery-slider`}
                onUploaded={(url) =>
                  setGallerySliderState((prev) => [...prev, url])
                }
              />
            </div>
          </div>
        </div>
      )}
      <input
        type="hidden"
        name="heroSlider"
        value={JSON.stringify(heroSliderState)}
      />
      <input
        type="hidden"
        name="gallerySlider"
        value={JSON.stringify(gallerySliderState)}
      />
    </div>
  );
}
