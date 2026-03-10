"use client";

import { useState } from "react";
import { Info } from "lucide-react";

export default function MapCoordinatesTooltip() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="desktop:hover:cursor-pointer"
      >
        <Info size={16} />
      </button>
      <div
        className={`absolute left-0 bottom-7 z-10 w-80 rounded border border-black bg-white p-3 text-smallest shadow-md transition-all delay-100 duration-200 origin-bottom-left ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"} group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto`}
      >
        <p className="mb-2 text-[16px] font-semibold">
          Here&apos;s how to find GPS coordinates on Google Maps:
        </p>
        <ol className="flex flex-col gap-1 list-decimal list-inside text-[16px]">
          <li>Go to maps.google.com and search for your location</li>
          <li>Right-click directly on the spot you want the coordinates for</li>
          <li>
            Click the coordinates shown at the top of the context menu (e.g.
            40.7128, -74.0060)
          </li>
          <li>They&apos;re now copied to your clipboard</li>
        </ol>
        <p className="mt-2 text-[16px] font-normal italic">
          The first number is latitude, the second is longitude.
        </p>
      </div>
    </div>
  );
}
