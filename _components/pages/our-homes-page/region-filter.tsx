"use client";

import { useState } from "react";
import classNames from "classnames";

import HomeItem from "@/_components/pages/our-homes-page/home-item";
import { FacilityNavigation } from "@/_types/facility-types";

type Region = "all" | "WC" | "GP" | "EC";

const regions = [
  { id: "WC" as Region, label: "Western Cape" },
  { id: "GP" as Region, label: "Gauteng" },
  { id: "EC" as Region, label: "Eastern Cape" },
];

interface Props {
  facilities: FacilityNavigation[];
}

const RegionFilter = ({ facilities }: Props) => {
  const [activeRegion, setActiveRegion] = useState<Region>("all");

  const filtered =
    activeRegion === "all"
      ? facilities
      : facilities.filter((f) => f.region === activeRegion);

  return (
    <>
      <div className="hidden min-[400px]:grid mb-10 place-content-center tablet:place-content-start tablet:mb-7">
        <ul className="flex gap-3 mb-5 justify-center desktop:mb-2">
          {regions.map((region, index) => (
            <div key={region.id} className="flex gap-3 items-center">
              {index > 0 && <span>|</span>}
              <li onClick={() => setActiveRegion(region.id)}>
                <button
                  className={classNames(
                    "italic text-link text-smallest min-[375px]:text-smaller p-4 -m-4 desktop:hover:text-green hover:cursor-pointer tablet:m-0 tablet:p-0 phone:text-paragraph ease-in-out duration-300",
                    {
                      "text-green font-normal": activeRegion === region.id,
                    },
                  )}
                >
                  {region.label}
                </button>
              </li>
            </div>
          ))}
        </ul>
        {activeRegion !== "all" && (
          <button
            className="mx-auto text-link p-2 -m-2 text-smallest font-light hover:cursor-pointer tablet:mx-0 tablet:place-self-start tablet:m-0 tablet:p-0 desktop:hover:text-green ease-in-out duration-300"
            onClick={() => setActiveRegion("all")}
          >
            Clear filter
          </button>
        )}
      </div>
      <main className="grid gap-y-12 gap-x-10 tablet:gap-y-24 tablet:gap-x-10 tablet:grid-cols-2">
        {filtered.map((facility) => (
          <div key={facility.slug} className="grid gap-16">
            <HomeItem
              data={facility}
              featuredImage={facility.featuredImage}
            />
            <hr className="text-black/25 tablet:hidden" />
          </div>
        ))}
      </main>
    </>
  );
};

export default RegionFilter;
