"use client";

import MediaUploader from "@/_components/user/dashboard/media-uploader";
import ImageList from "@/_components/user/dashboard/image-list";
import { deleteImage } from "@/_actions/delete-image-action";
import { buttonStyles } from "@/_styles/button-styles";

interface Props {
  facilitySlug: string;
  heroSliderState: string[];
  setHeroSliderState: React.Dispatch<React.SetStateAction<string[]>>;
  gallerySliderState: string[];
  setGallerySliderState: React.Dispatch<React.SetStateAction<string[]>>;
  heroDisplayMode: "slider" | "video";
  setHeroDisplayMode: (mode: "slider" | "video") => void;
  heroDesktopMp4: string;
  setHeroDesktopMp4: (url: string) => void;
  heroDesktopWebm: string;
  setHeroDesktopWebm: (url: string) => void;
  heroMobileMp4: string;
  setHeroMobileMp4: (url: string) => void;
  heroMobileWebm: string;
  setHeroMobileWebm: (url: string) => void;
  heroPoster: string;
  setHeroPoster: (url: string) => void;
  activeSection: string;
  toggleSection: (id: string) => void;
}

export default function MediaSection({
  facilitySlug,
  heroSliderState,
  setHeroSliderState,
  gallerySliderState,
  setGallerySliderState,
  heroDisplayMode,
  setHeroDisplayMode,
  heroDesktopMp4,
  setHeroDesktopMp4,
  heroDesktopWebm,
  setHeroDesktopWebm,
  heroMobileMp4,
  setHeroMobileMp4,
  heroMobileWebm,
  setHeroMobileWebm,
  heroPoster,
  setHeroPoster,
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
        <span className="text-subheading">Sliders/video</span>
        <span>{activeSection === "images" ? "−" : "+"}</span>
      </button>
      {activeSection === "images" && (
        <div className="flex flex-col gap-5 px-5 py-7 border-t border-black">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5">
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
                  />
                </div>
              </div>
              <div
                className={heroDisplayMode === "video" ? undefined : "hidden"}
              >
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-5">
                    <span className="font-semibold">Desktop MP4</span>
                    {heroDesktopMp4 && (
                      <span className="text-smallest text-black/70 italic break-all">
                        {heroDesktopMp4}
                      </span>
                    )}
                    <MediaUploader
                      mediaType="video"
                      maxSizeMb={3}
                      dimensionNote="Min dimensions: 1400 × 600px"
                      storagePath={`facilities/${facilitySlug}/hero-video/desktop`}
                      onUploaded={setHeroDesktopMp4}
                      currentUrl={heroDesktopMp4}
                      showPreview
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <span className="font-semibold">Desktop WebM</span>
                    {heroDesktopWebm && (
                      <span className="text-smallest text-black/70 italic break-all">
                        {heroDesktopWebm}
                      </span>
                    )}
                    <MediaUploader
                      mediaType="video"
                      maxSizeMb={3}
                      dimensionNote="Min dimensions: 1400 × 600px"
                      storagePath={`facilities/${facilitySlug}/hero-video/desktop`}
                      onUploaded={setHeroDesktopWebm}
                      currentUrl={heroDesktopWebm}
                      showPreview
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <span className="font-semibold">Mobile MP4</span>
                    {heroMobileMp4 && (
                      <span className="text-smallest text-black/70 italic break-all">
                        {heroMobileMp4}
                      </span>
                    )}
                    <MediaUploader
                      mediaType="video"
                      maxSizeMb={1.75}
                      dimensionNote="Min dimensions: 650 × 450px"
                      storagePath={`facilities/${facilitySlug}/hero-video/mobile`}
                      onUploaded={setHeroMobileMp4}
                      currentUrl={heroMobileMp4}
                      showPreview
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <span className="font-semibold">Mobile WebM</span>
                    {heroMobileWebm && (
                      <span className="text-smallest text-black/70 italic break-all">
                        {heroMobileWebm}
                      </span>
                    )}
                    <MediaUploader
                      mediaType="video"
                      maxSizeMb={1.75}
                      dimensionNote="Min dimensions: 650 × 450px"
                      storagePath={`facilities/${facilitySlug}/hero-video/mobile`}
                      onUploaded={setHeroMobileWebm}
                      currentUrl={heroMobileWebm}
                      showPreview
                    />
                  </div>
                  <div className="flex flex-col gap-5">
                    <span className="font-semibold">Poster</span>
                    <MediaUploader
                      storagePath={`facilities/${facilitySlug}/hero-video`}
                      onUploaded={setHeroPoster}
                      currentUrl={heroPoster}
                      showPreview={true}
                    />
                  </div>
                </div>
              </div>
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
                <MediaUploader
                  storagePath={`facilities/${facilitySlug}/gallery-slider`}
                  onUploaded={(url) =>
                    setGallerySliderState((prev) => [...prev, url])
                  }
                />
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
      <input
        type="hidden"
        name="gallerySlider"
        value={JSON.stringify(gallerySliderState)}
      />
      <input type="hidden" name="heroDisplayMode" value={heroDisplayMode} />
      <input type="hidden" name="heroDesktopMp4" value={heroDesktopMp4} />
      <input type="hidden" name="heroDesktopWebm" value={heroDesktopWebm} />
      <input type="hidden" name="heroMobileMp4" value={heroMobileMp4} />
      <input type="hidden" name="heroMobileWebm" value={heroMobileWebm} />
      <input type="hidden" name="heroPoster" value={heroPoster} />
    </div>
  );
}
