"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import navigation from "@/_data/navigation-data.json";
import crescentData from "@/_data/crescent-data.json";
import eastlandsData from "@/_data/eastlands-data.json";
import sereneData from "@/_data/serene-data.json";
import parsonageData from "@/_data/parsonage-data.json";

import classNames from "classnames";

interface Props {
  currentRoute: string;
  scrollPosition: number;
}

const DesktopHeader = ({ currentRoute, scrollPosition }: Props) => {
  const [toggleHomeSubmenu, setToggleHomeSubmenu] = useState(false);

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
          !(
            title === "Staff" &&
            config.meetTheTeam &&
            config.meetTheTeam.length <= 2
          ),
      )
    : navigation.general;

  return (
    <div className="hidden desktop:block relative py-4 border-b-1 w-full border-black/25 drop-shadow-sm bg-white">
      <div className="flex w-full justify-between items-end max-w-[1280px] mx-auto px-5">
        <Link prefetch={false} href="/" className="p-2 -m-2">
          <Image
            src="/assets/media/carevita-logo.png"
            alt="CareVita logo"
            width={80}
            height={120}
            className={classNames("transition-all h-auto", {
              "w-[80px]": scrollPosition === 0,
              "w-14": scrollPosition > 0,
            })}
            priority
            sizes="(max-width: 900px) 65px, (max-width: 1400px) 65px, 65px"
          />
        </Link>
        <nav>
          <ul className="flex gap-6">
            {navItems.map(({ title, url, homeSubmenu }, index) => (
              <li
                key={index}
                onMouseEnter={
                  homeSubmenu &&
                  (() => {
                    setToggleHomeSubmenu(!toggleHomeSubmenu);
                  })
                }
                onMouseLeave={
                  homeSubmenu &&
                  (() => {
                    setToggleHomeSubmenu(!toggleHomeSubmenu);
                  })
                }
              >
                <Link
                  prefetch={false}
                  href={url}
                  className={classNames(
                    "underline-offset-8 decoration-green decoration-2",
                    title !== "Our Homes"
                      ? "hover:underline"
                      : "px-4 -mx-4 pb-5 -mb-5",
                    {
                      underline: currentRoute === url,
                    },
                  )}
                >
                  {title}
                </Link>

                {homeSubmenu && toggleHomeSubmenu && (
                  <ul className="absolute bg-white px-6 py-3 border border-t-0 border-black -translate-x-[55px] rounded-b-xl flex flex-col gap-2 animate-grow-down">
                    <div className="absolute top-0 w-[102%] -left-[2px] h-4 bg-white" />
                    {homeSubmenu.map(({ title, url, location }, index) => (
                      <li key={index} className="flex flex-col gap-0.5">
                        <Link
                          prefetch={false}
                          href={url}
                          className={classNames(
                            "font-light text-smaller hover:underline underline-offset-[5px] decoration-green decoration-2",
                            {
                              underline: currentRoute === url,
                            },
                          )}
                        >
                          {title}
                        </Link>
                        <p className="text-smallest">{location}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DesktopHeader;
