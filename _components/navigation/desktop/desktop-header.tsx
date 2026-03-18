"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import classNames from "classnames";
import { FacilityNavigation } from "@/_types/facility-types";
import { signOut } from "@/_actions/auth-actions";

interface NavItem {
  title: string;
  url: string;
}

interface Props {
  currentRoute: string;
  scrollPosition: number;
  facilities: FacilityNavigation[];
  isLoggedIn: boolean;
}

const staticGeneralNav: NavItem[] = [
  { title: "Home", url: "/" },
  { title: "Services", url: "/#services" },
  { title: "Gallery", url: "/#gallery" },
];

const staticGeneralNavEnd: NavItem[] = [
  { title: "Blog", url: "/blog" },
  { title: "Contact", url: "/#contact" },
];

const DesktopHeader = ({
  currentRoute,
  scrollPosition,
  facilities,
  isLoggedIn,
}: Props) => {
  const [toggleHomeSubmenu, setToggleHomeSubmenu] = useState(false);

  const currentFacility = facilities.find(
    (f) => `/our-homes/${f.slug}` === currentRoute,
  );

  const homeSubmenu = facilities.map((f) => ({
    title: f.facilityName,
    location: f.cityTown,
    url: `/our-homes/${f.slug}`,
  }));

  const dashboardItem = { title: "Dashboard", url: "/dashboard" };

  const signOutItem = { title: "Sign Out", url: "" };

  const navItems = currentFacility
    ? [
        ...(isLoggedIn ? [dashboardItem, signOutItem] : []),
        { title: "Home", url: "/" },
        { title: "About", url: `${`/our-homes/${currentFacility.slug}`}#about` },
        ...(currentFacility.hasStaff
          ? [{ title: "Staff", url: `${`/our-homes/${currentFacility.slug}`}#staff` }]
          : []),
        { title: "Gallery", url: `${`/our-homes/${currentFacility.slug}`}#gallery` },
        { title: "Location", url: `${`/our-homes/${currentFacility.slug}`}#location` },
        { title: "Our Homes", url: "/our-homes" },
        { title: "Blog", url: "/blog" },
        { title: "Contact", url: `${`/our-homes/${currentFacility.slug}`}#contact` },
      ]
    : [
        ...(isLoggedIn ? [dashboardItem, signOutItem] : []),
        ...staticGeneralNav,
        { title: "Our Homes", url: "/our-homes" },
        ...staticGeneralNavEnd,
      ];

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
            {navItems.map(({ title, url }, index) =>
              title === "Sign Out" ? (
                <li key={index}>
                  <form action={signOut}>
                    <button
                      type="submit"
                      className="underline-offset-8 decoration-green font-normal decoration-2 hover:underline desktop:hover:cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </form>
                </li>
              ) : (
                <li
                  key={index}
                  onMouseEnter={
                    title === "Our Homes"
                      ? () => setToggleHomeSubmenu(true)
                      : undefined
                  }
                  onMouseLeave={
                    title === "Our Homes"
                      ? () => setToggleHomeSubmenu(false)
                      : undefined
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
                      title === "Dashboard" && "font-normal",
                    )}
                  >
                    {title}
                  </Link>

                  {title === "Our Homes" && toggleHomeSubmenu && (
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
              ),
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DesktopHeader;
