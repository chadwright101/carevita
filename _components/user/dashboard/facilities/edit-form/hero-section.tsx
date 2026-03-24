"use client";

import classNames from "classnames";
import { forwardRef } from "react";
import MediaUploader from "@/_components/user/dashboard/media-uploader";
import ImageList from "@/_components/user/dashboard/image-list";
import { deleteImage } from "@/_actions/delete-image-action";
import { buttonStyles } from "@/_styles/button-styles";

interface Props {
  facilitySlug: string;
  heroSliderState: string[];
  setHeroSliderState: React.Dispatch<React.SetStateAction<string[]>>;
  heroDisplayMode: "slider" | "video";
  setHeroDisplayMode: (mode: "slider" | "video") => void;
  heroLargeMp4: string;
  setHeroLargeMp4: (url: string) => void;
  heroLargeWebm: string;
  setHeroLargeWebm: (url: string) => void;
  heroSmallMp4: string;
  setHeroSmallMp4: (url: string) => void;
  heroSmallWebm: string;
  setHeroSmallWebm: (url: string) => void;
  heroPosterImage: string;
  setHeroPosterImage: (url: string) => void;
  activeSection: string;
  toggleSection: (id: string) => void;
  error?: string;
  onPendingAdd?: (url: string) => void;
  onPendingRemove?: (url: string) => void;
}

const HeroSection = forwardRef<HTMLDivElement, Props>(function HeroSection(
  {
    facilitySlug,
    heroSliderState,
    setHeroSliderState,
    heroDisplayMode,
    setHeroDisplayMode,
    heroLargeMp4,
    setHeroLargeMp4,
    heroLargeWebm,
    setHeroLargeWebm,
    heroSmallMp4,
    setHeroSmallMp4,
    heroSmallWebm,
    setHeroSmallWebm,
    heroPosterImage,
    setHeroPosterImage,
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
        onClick={() => toggleSection("hero")}
        className="w-full flex justify-between items-center p-4 desktop:hover:cursor-pointer"
      >
        <span className="flex items-center gap-3">
          <span
            className={classNames("text-subheading", { "text-error": error })}
          >
            Hero Slider/Video
          </span>
          {error && <span className="text-error text-smallest">{error}</span>}
        </span>
        <span>{activeSection === "hero" ? "−" : "+"}</span>
      </button>
      {activeSection === "hero" && (
        <div className="flex flex-col gap-5 px-5 py-7 border-t border-black">
          <div className="flex flex-col gap-10">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setHeroDisplayMode("slider")}
                className={buttonStyles(
                  undefined,
                  false,
                  false,
                  heroDisplayMode === "slider" ? "blue" : undefined,
                  undefined,
                  heroDisplayMode === "slider" ? undefined : "black",
                )}
              >
                Hero Slider
              </button>
              <button
                type="button"
                onClick={() => setHeroDisplayMode("video")}
                className={buttonStyles(
                  undefined,
                  false,
                  false,
                  heroDisplayMode === "video" ? "blue" : undefined,
                  undefined,
                  heroDisplayMode === "video" ? undefined : "black",
                )}
              >
                Hero Video
              </button>
            </div>
            <div
              className={heroDisplayMode === "slider" ? undefined : "hidden"}
            >
              <div className="flex flex-col gap-5">
                <span className="font-semibold">Hero Slider *</span>
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
                      onPendingRemove?.(url);
                      setHeroSliderState((prev) =>
                        prev.filter((img) => img !== url),
                      );
                    }}
                    onMove={(index, direction) => {
                      setHeroSliderState((prev) => {
                        const next = [...prev];
                        const target = index + direction;
                        if (target < 0 || target >= next.length) return prev;
                        [next[index], next[target]] = [
                          next[target],
                          next[index],
                        ];
                        return next;
                      });
                    }}
                  />
                )}
                <MediaUploader
                  storagePath={`facilities/${facilitySlug}/hero-slider`}
                  onUploaded={(url) =>
                    setHeroSliderState((prev) => [...prev, url])
                  }
                  multiple
                  maxFiles={3}
                  onPendingAdd={onPendingAdd}
                />
              </div>
            </div>
            <div className={heroDisplayMode === "video" ? undefined : "hidden"}>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-5 border-b border-black/25 pb-10">
                  <span className="font-semibold">Large MP4 *</span>
                  <MediaUploader
                    mediaType="video"
                    videoFormat="mp4"
                    maxSizeMb={7}
                    dimensionNote="Min dimensions: 1400 × 600px"
                    storagePath={`facilities/${facilitySlug}/hero-video/desktop`}
                    onUploaded={setHeroLargeMp4}
                    currentUrl={heroLargeMp4}
                    showPreview
                    replaceMode={!!heroLargeMp4}
                    onPendingAdd={onPendingAdd}
                    onPendingRemove={onPendingRemove}
                  />
                </div>
                <div className="flex flex-col gap-5 border-b border-black/25 pb-10">
                  <span className="font-semibold">Large WebM</span>
                  <MediaUploader
                    mediaType="video"
                    videoFormat="webm"
                    maxSizeMb={7}
                    dimensionNote="Min dimensions: 1400 × 600px"
                    storagePath={`facilities/${facilitySlug}/hero-video/desktop`}
                    onUploaded={setHeroLargeWebm}
                    currentUrl={heroLargeWebm}
                    showPreview
                    replaceMode={!!heroLargeWebm}
                    onPendingAdd={onPendingAdd}
                    onPendingRemove={onPendingRemove}
                  />
                </div>
                <div className="flex flex-col gap-5 border-b border-black/25 pb-10">
                  <span className="font-semibold">Small MP4</span>
                  <MediaUploader
                    mediaType="video"
                    videoFormat="mp4"
                    maxSizeMb={3}
                    dimensionNote="Min dimensions: 650 × 450px"
                    storagePath={`facilities/${facilitySlug}/hero-video/mobile`}
                    onUploaded={setHeroSmallMp4}
                    currentUrl={heroSmallMp4}
                    showPreview
                    replaceMode={!!heroSmallMp4}
                    onPendingAdd={onPendingAdd}
                    onPendingRemove={onPendingRemove}
                  />
                </div>
                <div className="flex flex-col gap-5 border-b border-black/25 pb-10">
                  <span className="font-semibold">Small WebM</span>
                  <MediaUploader
                    mediaType="video"
                    videoFormat="webm"
                    maxSizeMb={3}
                    dimensionNote="Min dimensions: 650 × 450px"
                    storagePath={`facilities/${facilitySlug}/hero-video/mobile`}
                    onUploaded={setHeroSmallWebm}
                    currentUrl={heroSmallWebm}
                    showPreview
                    replaceMode={!!heroSmallWebm}
                    onPendingAdd={onPendingAdd}
                    onPendingRemove={onPendingRemove}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <span className="font-semibold">Poster Image *</span>
                  <MediaUploader
                    storagePath={`facilities/${facilitySlug}/hero-video`}
                    onUploaded={setHeroPosterImage}
                    currentUrl={heroPosterImage}
                    showPreview={true}
                    onPendingAdd={onPendingAdd}
                    onPendingRemove={onPendingRemove}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <input
        type="hidden"
        name="heroSlider"
        value={JSON.stringify(heroSliderState)}
      />
      <input type="hidden" name="heroDisplayMode" value={heroDisplayMode} />
      <input type="hidden" name="heroLargeMp4" value={heroLargeMp4} />
      <input type="hidden" name="heroLargeWebm" value={heroLargeWebm} />
      <input type="hidden" name="heroSmallMp4" value={heroSmallMp4} />
      <input type="hidden" name="heroSmallWebm" value={heroSmallWebm} />
      <input type="hidden" name="heroPosterImage" value={heroPosterImage} />
    </div>
  );
});

export default HeroSection;
