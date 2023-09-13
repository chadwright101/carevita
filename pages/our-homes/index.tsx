import { useState } from "react";

import HomeItem from "@/components/pages/our-homes/home-item";
import Heading, { headingVariant } from "@/components/heading";
import Layout from "@/components/layout";
import Contact from "@/components/contact/contact";

import classNames from "classnames";

import crescentData from "@/data/crescent-data.json";
import sereneData from "@/data/serene-data.json";
import eastlandsData from "@/data/eastlands-data.json";
import parsonageData from "@/data/parsonage-data.json";

const OurHomes = () => {
  const [showGauteng, setShowGauteng] = useState(true);
  const [showWestern, setShowWestern] = useState(true);
  const [showEastern, setShowEastern] = useState(true);
  const [showClearFilter, setShowClearFilter] = useState(false);
  return (
    <>
      <Layout>
        <Heading variant={headingVariant.pageHeading}>Our Homes</Heading>
        <div className="mb-10 grid place-content-center tabletLarge:place-content-start tabletLarge:mb-4">
          <ul className="flex gap-3 mb-5 justify-center tabletLarge:justify-start">
            <li
              className={classNames(
                "italic text-link p-4 -m-4 hover:tabletLarge:text-green hover:tabletLarge:cursor-pointer tabletLarge:m-0 tabletLarge:p-0",
                {
                  "text-green": showGauteng && !showWestern && !showEastern,
                }
              )}
              onClick={() => {
                setShowGauteng(true),
                  setShowWestern(false),
                  setShowEastern(false),
                  setShowClearFilter(true);
              }}
            >
              Gauteng
            </li>
            |
            <li
              className={classNames(
                "italic text-link p-4 -m-4 hover:tabletLarge:text-green hover:tabletLarge:cursor-pointer tabletLarge:m-0 tabletLarge:p-0",
                {
                  "text-green": showWestern && !showGauteng && !showEastern,
                }
              )}
              onClick={() => {
                setShowWestern(true),
                  setShowGauteng(false),
                  setShowEastern(false),
                  setShowClearFilter(true);
              }}
            >
              Western Cape
            </li>
            |
            <li
              className={classNames(
                "italic text-link p-4 -m-4 hover:tabletLarge:text-green hover:tabletLarge:cursor-pointer tabletLarge:m-0 tabletLarge:p-0",
                {
                  "text-green": !showGauteng && !showWestern && showEastern,
                }
              )}
              onClick={() => {
                setShowEastern(true),
                  setShowGauteng(false),
                  setShowWestern(false),
                  setShowClearFilter(true);
              }}
            >
              Eastern Cape
            </li>
          </ul>
          {showClearFilter && (
            <button
              className="italic text-link p-4 -m-4 hover:tabletLarge::text-green hover:tabletLarge::cursor-pointer tabletLarge:mr-auto tabletLarge:m-0 tabletLarge:p-0 tabletLarge:mb-4"
              onClick={() => {
                setShowEastern(true),
                  setShowGauteng(true),
                  setShowWestern(true);
                setShowClearFilter(false);
              }}
            >
              Clear filter
            </button>
          )}
        </div>
        <main className="grid gap-y-12 gap-x-10 tabletLarge:gap-y-24 tabletLarge:gap-x-10 tabletLarge:grid-cols-2">
          {showWestern && (
            <div>
              <HomeItem
                data={crescentData}
                featuredImage={crescentData.images.heroSlider[1]}
              />
              <hr
                className={classNames("mt-16 tabletLarge:hidden", {
                  hidden: showWestern,
                })}
              />
            </div>
          )}
          {showGauteng && (
            <>
              <div>
                <HomeItem
                  data={eastlandsData}
                  featuredImage="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/eastlands/images/DJI_0549.jpg"
                />
                <hr className="mt-16 tabletLarge:hidden" />
              </div>
              <HomeItem
                data={sereneData}
                featuredImage={sereneData.images.heroSlider[2]}
              />
            </>
          )}
          {showEastern && (
            <HomeItem
              data={parsonageData}
              featuredImage="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/parsonage-street/images/9U7A3432-HDR.jpg"
            />
          )}
        </main>
      </Layout>
      <Contact cssClasses="mt-20" />
    </>
  );
};

export default OurHomes;
