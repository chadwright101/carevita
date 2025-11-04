"use client";

import Link from "next/link";
import { useState, Fragment } from "react";

import navigation from "@/data/navigation-data.json";
import crescentData from "@/data/crescent-data.json";
import eastlandsData from "@/data/eastlands-data.json";
import sereneData from "@/data/serene-data.json";
import parsonageData from "@/data/parsonage-data.json";
import ImageContainer from "@/components/utils/image-container";

import classNames from "classnames";

interface Props {
  currentRoute: string;
  scrollPosition: number;
  cssClasses?: string;
}

const MobileHeader = ({ currentRoute, scrollPosition, cssClasses }: Props) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
      <div className={`w-full flex justify-between items-center px-6 py-4 border-b-2 border-black drop-shadow-md bg-white tabletLarge:hidden ${cssClasses}`}>
        <Link prefetch={false} href="/" className="p-4 -m-4">
          <ImageContainer
            src="/assets/media/carevita-logo.png"
            alt="CareVita logo"
            width={80}
            height={120}
            cssClasses={classNames(
              "ease-in-out duration-300 delay-[10ms] h-auto",
              {
                "w-[80px]": scrollPosition === 0,
                "w-[64px]": scrollPosition > 0,
              }
            )}
            phone={30}
            desktop={10}
            eager
          />
        </Link>
        <button className="p-2 -m-2" onClick={() => setToggleMenu(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 96 960 960"
            width="48"
            fill="#222222"
            className="w-11 h-auto mt-1"
          >
            <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
          </svg>
        </button>
      </div>
      {toggleMenu && (
        <nav className="fixed top-0 h-screen w-full bg-blue pt-8 px-5 tabletLarge:hidden">
          <ul className="mt-10 flex flex-col gap-4">
            {currentRoute === "/our-homes/hartland-estate"
              ? navigation.hartland
                  .filter(
                    ({ title }) => title !== "About" && title !== "Location"
                  )
                  .map(({ title, url }, index) => (
                    <Fragment key={index}>
                      <li key={index}>
                        <Link
                          prefetch={false}
                          href={url}
                          onClick={() => setToggleMenu(false)}
                          className="text-white text-subheading p-4 -m-4"
                        >
                          {title}
                        </Link>
                      </li>
                      {index < navigation.hartland.length - 1 && (
                        <hr className="px-5 text-white" />
                      )}
                    </Fragment>
                  ))
              : currentRoute === "/our-homes/eastlands"
              ? navigation.eastlands
                  .filter(
                    ({ title }) =>
                      title !== "About" &&
                      title !== "Location" &&
                      !(title === "Staff" && eastlandsData.meetTheTeam.length <= 2)
                  )
                  .map(({ title, url }, index) => (
                    <Fragment key={index}>
                      <li key={index}>
                        <Link
                          prefetch={false}
                          href={url}
                          onClick={() => setToggleMenu(false)}
                          className="text-white text-subheading p-4 -m-4"
                        >
                          {title}
                        </Link>
                      </li>
                      {index < navigation.eastlands.length - 1 && (
                        <hr className="px-5 text-white" />
                      )}
                    </Fragment>
                  ))
              : currentRoute === "/our-homes/the-crescent"
              ? navigation.crescent
                  .filter(
                    ({ title }) =>
                      title !== "About" &&
                      title !== "Location" &&
                      !(title === "Staff" && crescentData.meetTheTeam.length <= 2)
                  )
                  .map(({ title, url }, index) => (
                    <Fragment key={index}>
                      <li key={index}>
                        <Link
                          prefetch={false}
                          href={url}
                          onClick={() => setToggleMenu(false)}
                          className="text-white text-subheading p-4 -m-4"
                        >
                          {title}
                        </Link>
                      </li>
                      {index < navigation.crescent.length - 1 && (
                        <hr className="px-5 text-white" />
                      )}
                    </Fragment>
                  ))
              : currentRoute === "/our-homes/serene-park"
              ? navigation.serene
                  .filter(
                    ({ title }) =>
                      title !== "About" &&
                      title !== "Location" &&
                      !(title === "Staff" && sereneData.meetTheTeam.length <= 2)
                  )
                  .map(({ title, url }, index) => (
                    <Fragment key={index}>
                      <li key={index}>
                        <Link
                          prefetch={false}
                          href={url}
                          onClick={() => setToggleMenu(false)}
                          className="text-white text-subheading p-4 -m-4"
                        >
                          {title}
                        </Link>
                      </li>
                      {index < navigation.serene.length - 1 && (
                        <hr className="px-5 text-white" />
                      )}
                    </Fragment>
                  ))
              : currentRoute === "/our-homes/parsonage-street-home"
              ? navigation.parsonage
                  .filter(
                    ({ title }) =>
                      title !== "About" &&
                      title !== "Location" &&
                      !(title === "Staff" && parsonageData.meetTheTeam.length <= 2)
                  )
                  .map(({ title, url }, index) => (
                    <Fragment key={index}>
                      <li key={index}>
                        <Link
                          prefetch={false}
                          href={url}
                          onClick={() => setToggleMenu(false)}
                          className="text-white text-subheading p-4 -m-4"
                        >
                          {title}
                        </Link>
                      </li>
                      {index < navigation.parsonage.length - 1 && (
                        <hr className="px-5 text-white" />
                      )}
                    </Fragment>
                  ))
              : navigation.general.map(({ title, url }, index) => (
                  <Fragment key={index}>
                    <li key={index}>
                      <Link
                        prefetch={false}
                        href={url}
                        onClick={() => setToggleMenu(false)}
                        className="text-white text-subheading p-4 -m-4"
                      >
                        {title}
                      </Link>
                    </li>
                    {index < navigation.general.length - 1 && (
                      <hr className="px-5 text-white" />
                    )}
                  </Fragment>
                ))}
          </ul>
          <button
            className="p-2 -m-2 absolute top-7 right-5"
            onClick={() => setToggleMenu(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              width="48"
              fill="#ffffff"
              className="w-11 h-auto mr-1"
            >
              <path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z" />
            </svg>
          </button>
        </nav>
      )}
    </>
  );
};

export default MobileHeader;
