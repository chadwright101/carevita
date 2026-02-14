"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, Fragment, useEffect } from "react";

import navigation from "@/_data/navigation-data.json";
import crescentData from "@/_data/crescent-data.json";
import eastlandsData from "@/_data/eastlands-data.json";
import sereneData from "@/_data/serene-data.json";
import parsonageData from "@/_data/parsonage-data.json";

import classNames from "classnames";
import { X } from "lucide-react";

interface Props {
  currentRoute: string;
  scrollPosition: number;
  cssClasses?: string;
}

const MobileHeader = ({ currentRoute, scrollPosition, cssClasses }: Props) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    if (toggleMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [toggleMenu]);

  const routeConfig: Record<
    string,
    { navKey: keyof typeof navigation; meetTheTeam?: { length: number } }
  > = {
    "/our-homes/hartland-estate": { navKey: "hartland" },
    "/our-homes/the-crescent": {
      navKey: "crescent",
      meetTheTeam: crescentData.meetTheTeam,
    },
    "/our-homes/eastlands": {
      navKey: "eastlands",
      meetTheTeam: eastlandsData.meetTheTeam,
    },
    "/our-homes/serene-park": {
      navKey: "serene",
      meetTheTeam: sereneData.meetTheTeam,
    },
    "/our-homes/parsonage-street-home": {
      navKey: "parsonage",
      meetTheTeam: parsonageData.meetTheTeam,
    },
  };

  const config = routeConfig[currentRoute];
  const navItems = config
    ? navigation[config.navKey].filter(
        ({ title }) =>
          title !== "About" &&
          title !== "Location" &&
          !(
            title === "Staff" &&
            config.meetTheTeam &&
            config.meetTheTeam.length <= 2
          ),
      )
    : navigation.general;

  return (
    <>
      <div
        className={classNames(
          "w-full flex justify-between items-center px-6 py-4 border-b border-black/25 drop-shadow-sm bg-white desktop:hidden",
          cssClasses,
        )}
      >
        <Link prefetch={false} href="/" className="p-4 -m-4">
          <Image
            src="/assets/media/carevita-logo.png"
            alt="CareVita logo"
            width={80}
            height={120}
            className={classNames(
              "ease-in-out duration-300 delay-[10ms] h-auto",
              {
                "w-[80px]": scrollPosition === 0,
                "w-[64px]": scrollPosition > 0,
              },
            )}
            priority
            sizes="(max-width: 425px) 30vw, 10vw"
          />
        </Link>
        <button className="p-2 -m-2" onClick={() => setToggleMenu(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 96 960 960"
            width="48"
            fill="#222222"
            className="size-8"
          >
            <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
          </svg>
        </button>
      </div>
      <nav
        className={classNames(
          "fixed inset-0 h-screen w-full bg-blue pt-8 px-5 desktop:hidden ease-in-out duration-300",
          toggleMenu ? "-translate-x-0" : "translate-x-full",
        )}
      >
        <ul className="mt-10 flex flex-col gap-4">
          {navItems.map(({ title, url }, index) => (
            <Fragment key={index}>
              <li>
                <Link
                  prefetch={false}
                  href={url}
                  onClick={() => setToggleMenu(false)}
                  className="text-white text-subheading p-4 -m-4"
                >
                  {title}
                </Link>
              </li>
              {index < navItems.length - 1 && (
                <hr className="px-5 text-white" />
              )}
            </Fragment>
          ))}
        </ul>
        <button
          className="p-2 -m-2 absolute top-6.5 right-6"
          onClick={() => setToggleMenu(false)}
        >
          <X size={32} color="#ffffff" />
        </button>
      </nav>
    </>
  );
};

export default MobileHeader;
