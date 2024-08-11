import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import navigation from "@/data/navigation-data.json";
import useScrollPosition from "@/components/utils/scroll-position";
import ImageContainer from "@/components/utils/image-container";

import classNames from "classnames";

interface Props {
  cssClasses?: string;
}

const Header = ({ cssClasses }: Props) => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleHomeSubmenu, setToggleHomeSubmenu] = useState(false);

  const scrollPosition = useScrollPosition();

  return (
    <header className={`w-full sticky h-auto top-0 z-10 ${cssClasses}`}>
      {/* mobile nav */}
      <div className="w-full flex justify-between items-center px-6 py-4 border-b-2 border-black drop-shadow-md bg-white tabletLarge:hidden">
        <Link href="/" className="p-4 -m-4">
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
            smallest={30}
            phone={20}
            desktopSmall={10}
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
            {currentRoute === "/our-homes/the-crescent"
              ? navigation.crescent
                  .filter(
                    ({ title }) => title !== "About" && title !== "Location"
                  )
                  .map(({ title, url }, index) => (
                    <>
                      <li key={index}>
                        <Link
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
                    </>
                  ))
              : currentRoute === "/our-homes/eastlands"
              ? navigation.eastlands
                  .filter(
                    ({ title }) => title !== "About" && title !== "Location"
                  )
                  .map(({ title, url }, index) => (
                    <>
                      <li key={index}>
                        <Link
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
                    </>
                  ))
              : currentRoute === "/our-homes/serene-park"
              ? navigation.serene
                  .filter(
                    ({ title }) => title !== "About" && title !== "Location"
                  )
                  .map(({ title, url }, index) => (
                    <>
                      <li key={index}>
                        <Link
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
                    </>
                  ))
              : navigation.general.map(({ title, url }, index) => (
                  <>
                    <li key={index}>
                      <Link
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
                  </>
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

      {/* desktop navigation */}
      <div className="hidden tabletLarge:block px-12 py-4 border-b-2 w-full border-black drop-shadow-md bg-white ">
        <div className="flex w-full justify-between items-end max-w-[1400px] mx-auto">
          <Link href="/" className="p-2 -m-2">
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
              {currentRoute === "/our-homes/the-crescent"
                ? navigation.crescent.map(
                    ({ title, url, homeSubmenu }, index) => (
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
                          href={url}
                          className={`underline-offset-8 decoration-green decoration-2 ${
                            title !== "Our Homes" && "hover:underline"
                          } ${currentRoute === url && "underline"}`}
                        >
                          {title}
                        </Link>

                        {homeSubmenu && toggleHomeSubmenu && (
                          <ul className="absolute bg-white p-6 border border-t-0 border-black -translate-x-[59px] rounded-b-xl flex flex-col gap-2">
                            {/* white blocks to hide borders */}
                            <div className="w-3 bg-white h-4 absolute -translate-x-8 -translate-y-6"></div>
                            <div className="w-3 bg-white h-4 absolute translate-x-[170px] -translate-y-6"></div>

                            {homeSubmenu.map(
                              ({ title, url, location }, index) => (
                                <li
                                  key={index}
                                  className="flex flex-col gap-0.5"
                                >
                                  <Link
                                    href={url}
                                    className={`font-light text-smaller hover:underline underline-offset-[5px] decoration-green decoration-2 ${
                                      currentRoute === url && "underline"
                                    }`}
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
                  )
                : currentRoute === "/our-homes/eastlands"
                ? navigation.eastlands.map(
                    ({ title, url, homeSubmenu }, index) => (
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
                          href={url}
                          className={`underline-offset-8 decoration-green decoration-2 ${
                            title !== "Our Homes" && "hover:underline"
                          } ${currentRoute === url && "underline"}`}
                        >
                          {title}
                        </Link>

                        {homeSubmenu && toggleHomeSubmenu && (
                          <ul className="absolute bg-white p-6 border border-t-0 border-black -translate-x-[59px] rounded-b-xl flex flex-col gap-2">
                            {/* white blocks to hide borders */}
                            <div className="w-3 bg-white h-4 absolute -translate-x-8 -translate-y-6"></div>
                            <div className="w-3 bg-white h-4 absolute translate-x-[170px] -translate-y-6"></div>

                            {homeSubmenu.map(
                              ({ title, url, location }, index) => (
                                <li
                                  key={index}
                                  className="flex flex-col gap-0.5"
                                >
                                  <Link
                                    href={url}
                                    className={`font-light text-smaller hover:underline underline-offset-[5px] decoration-green decoration-2 ${
                                      currentRoute === url && "underline"
                                    }`}
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
                  )
                : currentRoute === "/our-homes/serene-park"
                ? navigation.serene.map(
                    ({ title, url, homeSubmenu }, index) => (
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
                          href={url}
                          className={`underline-offset-8 decoration-green decoration-2 ${
                            title !== "Our Homes" && "hover:underline"
                          } ${currentRoute === url && "underline"}`}
                        >
                          {title}
                        </Link>

                        {homeSubmenu && toggleHomeSubmenu && (
                          <ul className="absolute bg-white p-6 border border-t-0 border-black -translate-x-[59px] rounded-b-xl flex flex-col gap-2">
                            {/* white blocks to hide borders */}
                            <div className="w-3 bg-white h-4 absolute -translate-x-8 -translate-y-6"></div>
                            <div className="w-3 bg-white h-4 absolute translate-x-[170px] -translate-y-6"></div>

                            {homeSubmenu.map(
                              ({ title, url, location }, index) => (
                                <li
                                  key={index}
                                  className="flex flex-col gap-0.5"
                                >
                                  <Link
                                    href={url}
                                    className={`font-light text-smaller hover:underline underline-offset-[5px] decoration-green decoration-2 ${
                                      currentRoute === url && "underline"
                                    }`}
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
                  )
                : currentRoute === "/our-homes/parsonage-street-home"
                ? navigation.parsonage.map(
                    ({ title, url, homeSubmenu }, index) => (
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
                          href={url}
                          className={`underline-offset-8 decoration-green decoration-2 ${
                            title !== "Our Homes" && "hover:underline"
                          } ${currentRoute === url && "underline"}`}
                        >
                          {title}
                        </Link>

                        {homeSubmenu && toggleHomeSubmenu && (
                          <ul className="absolute bg-white p-6 border border-t-0 border-black -translate-x-[59px] rounded-b-xl flex flex-col gap-2">
                            {/* white blocks to hide borders */}
                            <div className="w-3 bg-white h-4 absolute -translate-x-8 -translate-y-6"></div>
                            <div className="w-3 bg-white h-4 absolute translate-x-[170px] -translate-y-6"></div>

                            {homeSubmenu.map(
                              ({ title, url, location }, index) => (
                                <li
                                  key={index}
                                  className="flex flex-col gap-0.5"
                                >
                                  <Link
                                    href={url}
                                    className={`font-light text-smaller hover:underline underline-offset-[5px] decoration-green decoration-2 ${
                                      currentRoute === url && "underline"
                                    }`}
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
                  )
                : navigation.general.map(
                    ({ title, url, homeSubmenu }, index) => (
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
                          href={url}
                          className={`underline-offset-8 decoration-green decoration-2 ${
                            title !== "Our Homes" && "hover:underline"
                          } ${currentRoute === url && "underline"}`}
                        >
                          {title}
                        </Link>

                        {homeSubmenu && toggleHomeSubmenu && (
                          <ul className="absolute bg-white p-6 border border-t-0 border-black -translate-x-[59px] rounded-b-xl flex flex-col gap-2">
                            {/* white blocks to hide borders */}
                            <div className="w-3 bg-white h-4 absolute -translate-x-8 -translate-y-6"></div>
                            <div className="w-3 bg-white h-4 absolute translate-x-[170px] -translate-y-6"></div>

                            {homeSubmenu.map(
                              ({ title, url, location }, index) => (
                                <li
                                  key={index}
                                  className="flex flex-col gap-0.5"
                                >
                                  <Link
                                    href={url}
                                    className="font-light text-smaller hover:underline underline-offset-[5px] decoration-green decoration-2"
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
