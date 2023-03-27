import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import mobileMenuList from "../data/navigation/mobile-menu.json";
import desktopMenuList from "../data/navigation/desktop-menu.json";

import menuIcon from "public/icons/menu-icon.svg";
import closeIcon from "public/icons/close-icon.svg";

interface Props {
  cssClasses?: string;
}

const Header = ({ cssClasses }: Props) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleHomeSubmenu, setToggleHomeSubmenu] = useState(false);
  const [toggleSchoolSubmenu, setToggleSchoolSubmenu] = useState(false);

  return (
    <header className={`w-full sticky h-auto top-0 z-10 ${cssClasses}`}>
      {/* mobile nav */}
      <div className="w-full flex justify-between items-center px-6 py-4 border-b-2 border-black drop-shadow-md bg-white tabletLarge:hidden">
        <Link href="/" className="p-4 -m-4">
          <Image
            src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/carevita-logo.png"
            alt="CareVita logo"
            width={80}
            height={120}
          />
        </Link>
        <button className="p-2 -m-2" onClick={() => setToggleMenu(true)}>
          <Image src={menuIcon} alt="Menu icon" className="w-11 h-auto mt-1" />
        </button>
      </div>
      {toggleMenu && (
        <nav className="fixed top-0 h-screen w-full bg-blue pt-8 px-5">
          <ul className="mt-10 flex flex-col gap-4">
            {mobileMenuList.map(({ title, url }, index) => (
              <>
                <li key={index}>
                  <Link
                    href={url}
                    onClick={() => setToggleMenu(false)}
                    className="text-white text-subheading p-3 -m-3"
                  >
                    {title}
                  </Link>
                </li>
                {index < mobileMenuList.length - 1 && (
                  <hr className="px-5 text-white" />
                )}
              </>
            ))}
          </ul>
          <button
            className="p-2 -m-2 absolute top-7 right-5"
            onClick={() => setToggleMenu(false)}
          >
            <Image
              src={closeIcon}
              alt="Close menu icon"
              className="w-11 h-auto mr-1"
            />
          </button>
        </nav>
      )}

      {/* desktop navigation */}
      <div className="hidden tabletLarge:block px-12 py-4 border-b-2 w-full border-black drop-shadow-md bg-white ">
        <div className="flex w-full justify-between items-end max-w-[1400px] mx-auto">
          <Link href="/" className="p-2 -m-2">
            <Image
              src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/carevita-logo.png"
              alt="CareVita logo"
              width={80}
              height={120}
            />
          </Link>
          <nav>
            <ul className="flex gap-6">
              {desktopMenuList.map(
                ({ title, url, schoolSubmenu, homeSubmenu }, index) => (
                  <li
                    key={index}
                    onMouseEnter={
                      (schoolSubmenu &&
                        (() => {
                          setToggleSchoolSubmenu(!toggleSchoolSubmenu);
                        })) ||
                      (homeSubmenu &&
                        (() => {
                          setToggleHomeSubmenu(!toggleHomeSubmenu);
                        }))
                    }
                    onMouseLeave={
                      (schoolSubmenu &&
                        (() => {
                          setToggleSchoolSubmenu(!toggleSchoolSubmenu);
                        })) ||
                      (homeSubmenu &&
                        (() => {
                          setToggleHomeSubmenu(!toggleHomeSubmenu);
                        }))
                    }
                  >
                    <Link
                      href={url}
                      className={`${
                        index < 2 &&
                        "hover:underline underline-offset-8 decoration-green decoration-2"
                      } ${
                        index > 3 &&
                        "hover:underline underline-offset-8 decoration-green decoration-2"
                      }`}
                    >
                      {title}
                    </Link>

                    {homeSubmenu && toggleHomeSubmenu && (
                      <ul className="fixed bg-white p-6 border-2 border-t-0 border-black -translate-x-[60px] rounded-b-xl flex flex-col gap-2 drop-shadow-md">
                        {/* while blocks to hide borders */}
                        <div className="w-3 bg-white h-4 absolute -translate-x-8 -translate-y-6"></div>
                        <div className="w-3 bg-white h-4 absolute translate-x-[170px] -translate-y-6"></div>

                        {homeSubmenu.map(({ title, url, location }, index) => (
                          <li key={index} className="flex flex-col gap-0.5">
                            <Link
                              href={url}
                              className="font-light text-smaller hover:underline underline-offset-[5px] decoration-green decoration-2"
                            >
                              {title}
                            </Link>
                            <p className="text-smallest">{location}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                    {schoolSubmenu && toggleSchoolSubmenu && (
                      <ul className="fixed bg-white p-6 border-2 border-t-0 border-black -translate-x-8 rounded-b-xl flex flex-col gap-2 drop-shadow-md">
                        {/* while blocks to hide borders */}
                        <div className="w-3 bg-white h-4 absolute -translate-x-8 -translate-y-6"></div>
                        <div className="w-3 bg-white h-4 absolute translate-x-[120px] -translate-y-6"></div>

                        {schoolSubmenu.map(
                          ({ title, url, location }, index) => (
                            <li key={index} className="flex flex-col gap-0.5">
                              <Link
                                href={url}
                                className=" font-light text-smaller hover:underline underline-offset-[5px] decoration-green decoration-2"
                              >
                                {title}
                              </Link>
                              <p className="text-smallest">{location}</p>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
