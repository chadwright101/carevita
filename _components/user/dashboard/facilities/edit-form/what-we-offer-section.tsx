import Image from "next/image";

interface Props {
  whatWeOfferList: string[];
  setWhatWeOfferList: React.Dispatch<React.SetStateAction<string[]>>;
  whatWeOfferImage: string;
  setWhatWeOfferImage: (v: string) => void;
  pampering: string[];
  setPampering: React.Dispatch<React.SetStateAction<string[]>>;
  weeklyActivities: string[];
  setWeeklyActivities: React.Dispatch<React.SetStateAction<string[]>>;
  activeSection: string;
  toggleSection: (id: string) => void;
}

export default function WhatWeOfferSection({
  whatWeOfferList,
  setWhatWeOfferList,
  whatWeOfferImage,
  setWhatWeOfferImage,
  pampering,
  setPampering,
  weeklyActivities,
  setWeeklyActivities,
  activeSection,
  toggleSection,
}: Props) {
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
          {whatWeOfferList.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={item}
                onChange={(e) =>
                  setWhatWeOfferList((prev) =>
                    prev.map((v, j) => (j === i ? e.target.value : v))
                  )
                }
                className="border border-black rounded p-2 flex-1"
              />
              <button
                type="button"
                onClick={() =>
                  setWhatWeOfferList((prev) => prev.filter((_, j) => j !== i))
                }
                className="desktop:hover:cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setWhatWeOfferList((prev) => [...prev, ""])}
            className="desktop:hover:cursor-pointer self-start"
          >
            Add Item
          </button>
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
          <span className="text-smallest">Pampering (optional)</span>
          {pampering.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={item}
                onChange={(e) =>
                  setPampering((prev) =>
                    prev.map((v, j) => (j === i ? e.target.value : v))
                  )
                }
                className="border border-black rounded p-2 flex-1"
              />
              <button
                type="button"
                onClick={() =>
                  setPampering((prev) => prev.filter((_, j) => j !== i))
                }
                className="desktop:hover:cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setPampering((prev) => [...prev, ""])}
            className="desktop:hover:cursor-pointer self-start"
          >
            Add Item
          </button>
          <span className="text-smallest">Weekly Activities (optional)</span>
          {weeklyActivities.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={item}
                onChange={(e) =>
                  setWeeklyActivities((prev) =>
                    prev.map((v, j) => (j === i ? e.target.value : v))
                  )
                }
                className="border border-black rounded p-2 flex-1"
              />
              <button
                type="button"
                onClick={() =>
                  setWeeklyActivities((prev) =>
                    prev.filter((_, j) => j !== i)
                  )
                }
                className="desktop:hover:cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setWeeklyActivities((prev) => [...prev, ""])}
            className="desktop:hover:cursor-pointer self-start"
          >
            Add Item
          </button>
        </div>
      )}
      <input
        type="hidden"
        name="whatWeOfferList"
        value={JSON.stringify(whatWeOfferList)}
      />
      <input
        type="hidden"
        name="whatWeOfferImage"
        value={whatWeOfferImage}
      />
      <input
        type="hidden"
        name="pampering"
        value={JSON.stringify(pampering)}
      />
      <input
        type="hidden"
        name="weeklyActivities"
        value={JSON.stringify(weeklyActivities)}
      />
    </div>
  );
}
