"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, Fragment, useEffect } from "react";

import classNames from "classnames";
import { X } from "lucide-react";
import { FacilityNavigation } from "@/_types/facility-types";

interface Props {
  currentRoute: string;
  scrollPosition: number;
  cssClasses?: string;
  facilities: FacilityNavigation[];
}

const MobileHeader = ({ currentRoute, scrollPosition, cssClasses, facilities }: Props) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    if (toggleMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [toggleMenu]);

  const currentFacility = facilities.find(
    (f) => `/our-homes/${f.slug}` === currentRoute,
  );

  const navItems = currentFacility
    ? [
        { title: "Home", url: "/" },
        ...(currentFacility.hasStaff
          ? [{ title: "Staff", url: `${currentFacility.homeUrl}#staff` }]
          : []),
        { title: "Gallery", url: `${currentFacility.homeUrl}#gallery` },
        { title: "Our Homes", url: "/our-homes" },
        { title: "Blog", url: "/blog" },
        { title: "Contact", url: `${currentFacility.homeUrl}#contact` },
      ]
    : [
        { title: "Home", url: "/" },
        { title: "Services", url: "/#services" },
        { title: "Gallery", url: "/#gallery" },
        { title: "Our Homes", url: "/our-homes" },
        { title: "Blog", url: "/blog" },
        { title: "Contact", url: "/#contact" },
      ];

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
