import Head from "next/head";
import { useState } from "react";

import HomeItem from "@/components/pages/our-homes/home-item";
import Heading, { headingVariant } from "@/components/heading";
import Layout from "@/components/layout";
import Contact from "@/components/contact/contact";

import classNames from "classnames";

import generalData from "@/data/general-data.json";
import crescentData from "@/data/crescent-data.json";
import sereneData from "@/data/serene-data.json";
import eastlandsData from "@/data/eastlands-data.json";
import parsonageData from "@/data/parsonage-data.json";
import hartlandData from "@/data/hartland-data.json";

const OurHomes = () => {
  const [showGauteng, setShowGauteng] = useState(true);
  const [showWestern, setShowWestern] = useState(true);
  const [showEastern, setShowEastern] = useState(true);
  const [showClearFilter, setShowClearFilter] = useState(false);
  const {
    ourHomes: {
      meta: { title, description, keywords, images },
    },
  } = generalData;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        {images.map((image, index) => (
          <meta property="og:image" content={image} key={index} />
        ))}
        <meta property="og:title" content={`${title}`} />
        <meta property="og:url" content={`https://www.catevita.co.za`} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={`Home - ${title}`} />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon"></link>
      </Head>
      <Layout>
        <Heading variant={headingVariant.pageHeading}>Our Homes</Heading>
        <div className="hidden min-[350px]:grid mb-10 place-content-center tablet:place-content-start tabletLarge:mb-4">
          <ul className="flex gap-3 mb-5 justify-center tabletLarge:justify-start">
            <li
              className={classNames(
                "italic text-link text-smallest min-[375px]:text-smaller p-4 -m-4 hover:text-green hover:tabletLarge:cursor-pointer tabletLarge:m-0 tabletLarge:p-0 phone:text-paragraph",
                {
                  "text-green font-light":
                    showGauteng && !showWestern && !showEastern,
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
                "italic text-link text-smallest min-[375px]:text-smaller p-4 -m-4 hover:text-green hover:tabletLarge:cursor-pointer tabletLarge:m-0 tabletLarge:p-0 phone:text-paragraph",
                {
                  "text-green font-light":
                    showWestern && !showGauteng && !showEastern,
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
                "italic text-link text-smallest min-[375px]:text-smaller p-4 -m-4 hover:text-green hover:tabletLarge:cursor-pointer tabletLarge:m-0 tabletLarge:p-0 phone:text-paragraph",
                {
                  "text-green font-light":
                    !showGauteng && !showWestern && showEastern,
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
              className="italic text-link p-4 -m-4 text-paragraph hover:tabletLarge::text-green hover:tabletLarge::cursor-pointer tablet:mr-auto tabletLarge:mr-auto tabletLarge:m-0 tabletLarge:p-0 tabletLarge:mb-4"
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
          {showGauteng && (
            <>
              <div>
                <HomeItem
                  data={eastlandsData}
                  featuredImage={eastlandsData.images.heroSlider[0]}
                />
                <hr className="mt-16 tabletLarge:hidden" />
              </div>
              <HomeItem
                data={sereneData}
                featuredImage={sereneData.images.heroSlider[1]}
              />
            </>
          )}
          {showWestern && (
            <>
              <div>
                <HomeItem
                  data={crescentData}
                  featuredImage={crescentData.images.heroSlider[1]}
                />
                <hr className="mt-16 tabletLarge:hidden" />
              </div>
              <HomeItem
                data={hartlandData}
                featuredImage={hartlandData.images.heroSlider[1]}
              />
            </>
          )}
          {showEastern && (
            <HomeItem
              data={parsonageData}
              featuredImage="/assets/media/parsonage-street/9U7A3432-HDR.jpg"
            />
          )}
        </main>
      </Layout>
      <Contact cssClasses="mt-20" />
    </>
  );
};

export default OurHomes;
