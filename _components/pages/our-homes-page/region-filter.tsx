"use client";

import { useState } from "react";
import classNames from "classnames";

import HomeItem from "@/_components/pages/our-homes-page/home-item";

import crescentData from "@/_data/crescent-data.json";
import sereneData from "@/_data/serene-data.json";
import eastlandsData from "@/_data/eastlands-data.json";
import parsonageData from "@/_data/parsonage-data.json";
import hartlandData from "@/_data/hartland-data.json";

type Region = "all" | "western" | "gauteng" | "eastern";

const regions = [
  { id: "western" as Region, label: "Western Cape" },
  { id: "gauteng" as Region, label: "Gauteng" },
  { id: "eastern" as Region, label: "Eastern Cape" },
];

const RegionFilter = () => {
  const [activeRegion, setActiveRegion] = useState<Region>("all");

  const showWestern = activeRegion === "all" || activeRegion === "western";
  const showGauteng = activeRegion === "all" || activeRegion === "gauteng";
  const showEastern = activeRegion === "all" || activeRegion === "eastern";

  return (
    <>
      <div className="hidden min-[350px]:grid mb-10 place-content-center tablet:place-content-start tablet:mb-7">
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
        {showWestern && (
          <>
            <div className="grid gap-16">
              <HomeItem
                data={hartlandData}
                featuredImage={hartlandData.images.gallerySlider[0]}
              />
              <hr className="text-black/25 tablet:hidden" />
            </div>
            <div className="grid gap-16">
              <HomeItem
                data={crescentData}
                featuredImage={crescentData.images.heroSlider[1]}
              />
              <hr className="text-black/25 tablet:hidden" />
            </div>
          </>
        )}
        {showGauteng && (
          <>
            <div className="grid gap-16">
              <HomeItem
                data={eastlandsData}
                featuredImage={eastlandsData.images.heroSlider[0]}
              />
              <hr className="text-black/25 tablet:hidden" />
            </div>
            <div className="grid gap-16">
              <HomeItem
                data={sereneData}
                featuredImage={sereneData.images.heroSlider[1]}
              />
              <hr className="text-black/25 tablet:hidden" />
            </div>
          </>
        )}

        {showEastern && (
          <div className="grid gap-16">
            <HomeItem
              data={parsonageData}
              featuredImage="/assets/media/parsonage-street/9U7A3432-HDR.jpg"
            />
            <hr className="text-black/25 tablet:hidden" />
          </div>
        )}
      </main>
    </>
  );
};

export default RegionFilter;
