import Image from "next/image";

interface Props {
  heroSliderState: string[];
  setHeroSliderState: React.Dispatch<React.SetStateAction<string[]>>;
  gallerySliderState: string[];
  setGallerySliderState: React.Dispatch<React.SetStateAction<string[]>>;
  activeSection: string;
  toggleSection: (id: string) => void;
}

export default function ImagesSection({
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
        <div className="flex flex-col gap-3 p-4 border-t border-black">
          <span className="text-smallest">Hero Slider</span>
          {heroSliderState.map((url, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex gap-2">
                <input
                  value={url}
                  onChange={(e) =>
                    setHeroSliderState((prev) =>
                      prev.map((v, j) => (j === i ? e.target.value : v))
                    )
                  }
                  className="border border-black rounded p-2 flex-1"
                />
                <button
                  type="button"
                  onClick={() =>
                    setHeroSliderState((prev) =>
                      prev.filter((_, j) => j !== i)
                    )
                  }
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
          <button
            type="button"
            onClick={() => setHeroSliderState((prev) => [...prev, ""])}
            className="desktop:hover:cursor-pointer self-start"
          >
            Add Hero Image
          </button>
          <span className="text-smallest">Gallery Slider</span>
          {gallerySliderState.map((url, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex gap-2">
                <input
                  value={url}
                  onChange={(e) =>
                    setGallerySliderState((prev) =>
                      prev.map((v, j) => (j === i ? e.target.value : v))
                    )
                  }
                  className="border border-black rounded p-2 flex-1"
                />
                <button
                  type="button"
                  onClick={() =>
                    setGallerySliderState((prev) =>
                      prev.filter((_, j) => j !== i)
                    )
                  }
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
          <button
            type="button"
            onClick={() => setGallerySliderState((prev) => [...prev, ""])}
            className="desktop:hover:cursor-pointer self-start"
          >
            Add Gallery Image
          </button>
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
