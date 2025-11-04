"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import navigation from "@/data/navigation-data.json";
import crescentData from "@/data/crescent-data.json";
import eastlandsData from "@/data/eastlands-data.json";
import sereneData from "@/data/serene-data.json";
import parsonageData from "@/data/parsonage-data.json";

import classNames from "classnames";

interface Props {
  currentRoute: string;
  scrollPosition: number;
}

const DesktopHeader = ({ currentRoute, scrollPosition }: Props) => {
  const [toggleHomeSubmenu, setToggleHomeSubmenu] = useState(false);

  return (
    <div className="hidden tabletLarge:block px-12 py-4 border-b-2 w-full border-black drop-shadow-md bg-white ">
      <div className="flex w-full justify-between items-end max-w-[1400px] mx-auto">
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
            {currentRoute === "/our-homes/hartland-estate"
              ? navigation.hartland.map(
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
                        prefetch={false}
                        href={url}
                        className={`underline-offset-8 decoration-green decoration-2 ${
                          title !== "Our Homes" && "hover:underline"
                        } ${currentRoute === url && "underline"}`}
                      >
                        {title}
                      </Link>

                      {homeSubmenu && toggleHomeSubmenu && (
                        <ul className="absolute bg-white p-6 border border-t-0 border-black -translate-x-[59px] rounded-b-xl flex flex-col gap-2">
                          <div className="w-3 bg-white h-4 absolute -translate-x-8 -translate-y-6"></div>
                          <div className="w-3 bg-white h-4 absolute translate-x-[170px] -translate-y-6"></div>

                          {homeSubmenu.map(
                            ({ title, url, location }, index) => (
                              <li
                                key={index}
                                className="flex flex-col gap-0.5"
                              >
                                <Link
                                  prefetch={false}
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
              : currentRoute === "/our-homes/the-crescent"
              ? navigation.crescent
                  .filter(
                    ({ title }) =>
                      !(title === "Staff" && crescentData.meetTheTeam.length <= 2)
                  )
                  .map(({ title, url, homeSubmenu }, index) => (
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
                        className={`underline-offset-8 decoration-green decoration-2 ${
                          title !== "Our Homes" && "hover:underline"
                        } ${currentRoute === url && "underline"}`}
                      >
                        {title}
                      </Link>

                      {homeSubmenu && toggleHomeSubmenu && (
                        <ul className="absolute bg-white p-6 border border-t-0 border-black -translate-x-[59px] rounded-b-xl flex flex-col gap-2">
                          <div className="w-3 bg-white h-4 absolute -translate-x-8 -translate-y-6"></div>
                          <div className="w-3 bg-white h-4 absolute translate-x-[170px] -translate-y-6"></div>

                          {homeSubmenu.map(
                            ({ title, url, location }, index) => (
                              <li
                                key={index}
                                className="flex flex-col gap-0.5"
                              >
                                <Link
                                  prefetch={false}
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
              ? navigation.eastlands
                  .filter(
                    ({ title }) =>
                      !(title === "Staff" && eastlandsData.meetTheTeam.length <= 2)
                  )
                  .map(({ title, url, homeSubmenu }, index) => (
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
                        className={`underline-offset-8 decoration-green decoration-2 ${
                          title !== "Our Homes" && "hover:underline"
                        } ${currentRoute === url && "underline"}`}
                      >
                        {title}
                      </Link>

                      {homeSubmenu && toggleHomeSubmenu && (
                        <ul className="absolute bg-white p-6 border border-t-0 border-black -translate-x-[59px] rounded-b-xl flex flex-col gap-2">
                          <div className="w-3 bg-white h-4 absolute -translate-x-8 -translate-y-6"></div>
                          <div className="w-3 bg-white h-4 absolute translate-x-[170px] -translate-y-6"></div>

                          {homeSubmenu.map(
                            ({ title, url, location }, index) => (
                              <li
                                key={index}
                                className="flex flex-col gap-0.5"
                              >
                                <Link
                                  prefetch={false}
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
              ? navigation.serene
                  .filter(
                    ({ title }) =>
                      !(title === "Staff" && sereneData.meetTheTeam.length <= 2)
                  )
                  .map(({ title, url, homeSubmenu }, index) => (
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
                        className={`underline-offset-8 decoration-green decoration-2 ${
                          title !== "Our Homes" && "hover:underline"
                        } ${currentRoute === url && "underline"}`}
                      >
                        {title}
                      </Link>

                      {homeSubmenu && toggleHomeSubmenu && (
                        <ul className="absolute bg-white p-6 border border-t-0 border-black -translate-x-[59px] rounded-b-xl flex flex-col gap-2">
                          <div className="w-3 bg-white h-4 absolute -translate-x-8 -translate-y-6"></div>
                          <div className="w-3 bg-white h-4 absolute translate-x-[170px] -translate-y-6"></div>

                          {homeSubmenu.map(
                            ({ title, url, location }, index) => (
                              <li
                                key={index}
                                className="flex flex-col gap-0.5"
                              >
                                <Link
                                  prefetch={false}
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
              ? navigation.parsonage
                  .filter(
                    ({ title }) =>
                      !(title === "Staff" && parsonageData.meetTheTeam.length <= 2)
                  )
                  .map(({ title, url, homeSubmenu }, index) => (
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
                        className={`underline-offset-8 decoration-green decoration-2 ${
                          title !== "Our Homes" && "hover:underline"
                        } ${currentRoute === url && "underline"}`}
                      >
                        {title}
                      </Link>

                      {homeSubmenu && toggleHomeSubmenu && (
                        <ul className="absolute bg-white p-6 border border-t-0 border-black -translate-x-[59px] rounded-b-xl flex flex-col gap-2">
                          <div className="w-3 bg-white h-4 absolute -translate-x-8 -translate-y-6"></div>
                          <div className="w-3 bg-white h-4 absolute translate-x-[170px] -translate-y-6"></div>

                          {homeSubmenu.map(
                            ({ title, url, location }, index) => (
                              <li
                                key={index}
                                className="flex flex-col gap-0.5"
                              >
                                <Link
                                  prefetch={false}
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
                        prefetch={false}
                        href={url}
                        className={`underline-offset-8 decoration-green decoration-2 ${
                          title !== "Our Homes" && "hover:underline"
                        } ${currentRoute === url && "underline"}`}
                      >
                        {title}
                      </Link>

                      {homeSubmenu && toggleHomeSubmenu && (
                        <ul className="absolute bg-white p-6 border border-t-0 border-black -translate-x-[59px] rounded-b-xl flex flex-col gap-2">
                          <div className="w-3 bg-white h-4 absolute -translate-x-8 -translate-y-6"></div>
                          <div className="w-3 bg-white h-4 absolute translate-x-[170px] -translate-y-6"></div>

                          {homeSubmenu.map(
                            ({ title, url, location }, index) => (
                              <li
                                key={index}
                                className="flex flex-col gap-0.5"
                              >
                                <Link
                                  prefetch={false}
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
  );
};

export default DesktopHeader;
