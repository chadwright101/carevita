import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Button from "./button";

import classNames from "classnames";

import homeList from "../data/our-homes-general.json";

interface Props {
  cssClasses?: string;
}

const ContactForm = ({ cssClasses }: Props) => {
  const [showCrescent, setShowCrescent] = useState(false);
  const [showEastlands, setShowEastlands] = useState(false);
  const [showSerenePark, setShowSerenePark] = useState(false);

  return (
    <div className={`${cssClasses}`}>
      {/* mobile view */}
      <div className="desktop:hidden">
        {/* the crescent form */}
        <div
          className={classNames("mt-10 max-w-[1400px] mx-auto", {
            "-ml-6": showCrescent,
          })}
        >
          {!showCrescent && !showEastlands && !showSerenePark && (
            <>
              <p className="text-white mb-8">
                Please select which facility you&#39;d like to get in touch
                with...
              </p>
              <Button
                mobileHomesForm
                onClick={() => setShowCrescent(!showCrescent)}
                cssClasses="text-left"
                extendedTitle={homeList.Crescent.extendedTitle}
                location={homeList.Crescent.location}
                homeIconUrl="/icons/beach-blue.svg"
                homeIconAlt="Beach umbrella icon"
              />
            </>
          )}

          {showCrescent && (
            <div className="flex flex-col gap-6 fixed top-0 h-screen w-full bg-blue z-20 pt-10 px-6 tablet:relative tablet:h-auto tablet:pt-0 tablet:z-0">
              <div className="flex flex-col">
                <h4 className="text-white text-center font-light tablet:text-left">
                  {homeList.Crescent.title}
                </h4>
                <p className="text-white text-center tablet:text-left">
                  {homeList.Crescent.location}
                </p>
              </div>
              <ul className="flex flex-col gap-2 mt-4">
                <li className="grid grid-cols-[80px_1fr]">
                  <p className="text-white text-larger font-light">Email:</p>
                  <Link
                    href="mailto:jumireej@carevita.co.za"
                    className="text-white text-larger"
                  >
                    {homeList.Crescent.email}
                  </Link>
                </li>
                <li className="grid grid-cols-[80px_1fr]">
                  <p className="text-white text-larger font-light">Phone:</p>
                  <Link
                    href="tel:+27445331234"
                    className="text-white text-larger"
                  >
                    {homeList.Crescent.phone}
                  </Link>
                </li>
              </ul>
              <form action="" method="POST" className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="name"
                    className="text-larger text-white font-thin"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Full name"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="email"
                    className="text-larger text-white font-thin"
                  >
                    Email:
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    required
                    placeholder="Email address"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="email"
                    className="text-larger text-white font-thin"
                  >
                    Message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Type your message here"
                    className="pl-2 py-1.5"
                    rows={3}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <Button form onClick={() => setShowCrescent(false)}>
                    Submit
                  </Button>
                  <Button formBack onClick={() => setShowCrescent(false)}>
                    Back
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* eastlands form form */}

        <div
          className={classNames("mt-10 max-w-[1400px] mx-auto", {
            "-ml-6": showEastlands,
          })}
        >
          {!showCrescent && !showEastlands && !showSerenePark && (
            <Button
              mobileHomesForm
              onClick={() => setShowEastlands(!showEastlands)}
              cssClasses="text-left"
              extendedTitle={homeList.Eastlands.extendedTitle}
              location={homeList.Eastlands.location}
              homeIconUrl="/icons/flower-blue.svg"
              homeIconAlt="Flower icon"
            />
          )}

          {showEastlands && (
            <div className="flex flex-col gap-6 fixed top-0 h-screen w-full bg-blue z-20 pt-10 px-6 tablet:relative tablet:h-auto tablet:pt-0 tablet:z-0">
              <div className="flex flex-col">
                <h4 className="text-white text-center font-light tablet:text-left">
                  {homeList.Eastlands.title}
                </h4>
                <p className="text-white text-center tablet:text-left">
                  {homeList.Eastlands.location}
                </p>
              </div>
              <ul className="flex flex-col gap-2 mt-4">
                <li className="grid grid-cols-[80px_1fr]">
                  <p className="text-white text-larger font-light">Email:</p>
                  <Link
                    href="mailto:eastlands@carevita.co.za"
                    className="text-white text-larger"
                  >
                    {homeList.Eastlands.email}
                  </Link>
                </li>
                <li className="grid grid-cols-[80px_1fr]">
                  <p className="text-white text-larger font-light">Phone:</p>
                  <Link
                    href="tel:1234567890"
                    className="text-white text-larger"
                  >
                    {homeList.Eastlands.phone}
                  </Link>
                </li>
              </ul>
              <form action="" method="POST" className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="name"
                    className="text-larger text-white font-thin"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Full name"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="email"
                    className="text-larger text-white font-thin"
                  >
                    Email:
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    required
                    placeholder="Email address"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="email"
                    className="text-larger text-white font-thin"
                  >
                    Message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Type your message here"
                    className="pl-2 py-1.5"
                    rows={3}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <Button form onClick={() => setShowEastlands(false)}>
                    Submit
                  </Button>
                  <Button formBack onClick={() => setShowEastlands(false)}>
                    Back
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* serenepark form form */}

        <div
          className={classNames("mt-10 max-w-[1400px] mx-auto", {
            "-ml-6": showSerenePark,
          })}
        >
          {!showCrescent && !showEastlands && !showSerenePark && (
            <Button
              mobileHomesForm
              onClick={() => setShowSerenePark(!showSerenePark)}
              cssClasses="text-left"
              extendedTitle={homeList.Serenepark.extendedTitle}
              location={homeList.Serenepark.location}
              homeIconUrl="/icons/leaves-blue.svg"
              homeIconAlt="Leaves icon"
            />
          )}

          {showSerenePark && (
            <div className="flex flex-col gap-6 fixed top-0 h-screen w-full bg-blue z-20 pt-10 px-6 tablet:relative tablet:h-auto tablet:pt-0 tablet:z-0">
              <div className="flex flex-col">
                <h4 className="text-white text-center font-light tablet:text-left">
                  {homeList.Serenepark.title}
                </h4>
                <p className="text-white text-center tablet:text-left">
                  {homeList.Serenepark.location}
                </p>
              </div>
              <ul className="flex flex-col gap-2 mt-4">
                <li className="grid grid-cols-[80px_1fr]">
                  <p className="text-white text-larger font-light">Email:</p>
                  <Link
                    href="mailto:serenepark@carevita.co.za"
                    className="text-white text-larger"
                  >
                    {homeList.Serenepark.email}
                  </Link>
                </li>
                <li className="grid grid-cols-[80px_1fr]">
                  <p className="text-white text-larger font-light">Phone:</p>
                  <Link
                    href="tel:1234567890"
                    className="text-white text-larger"
                  >
                    {homeList.Serenepark.phone}
                  </Link>
                </li>
              </ul>
              <form action="" method="POST" className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="name"
                    className="text-larger text-white font-thin"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Full name"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="email"
                    className="text-larger text-white font-thin"
                  >
                    Email:
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    required
                    placeholder="Email address"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="email"
                    className="text-larger text-white font-thin"
                  >
                    Message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Type your message here"
                    className="pl-2 py-1.5"
                    rows={3}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <Button form onClick={() => setShowSerenePark(false)}>
                    Submit
                  </Button>
                  <Button formBack onClick={() => setShowSerenePark(false)}>
                    Back
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* desktop view */}
      <div className="hidden desktop:block max-w-[1400px] mx-auto">
        <p className="text-white mb-10 pb-10 border-b border-white">
          Please select which facility you&#39;d like to get in touch with...
        </p>
        <div className="grid grid-cols-3">
          {/* the crescent */}
          <Button
            desktopHomesForm
            onClick={() => {
              setShowCrescent(true);
              setShowEastlands(false);
              setShowSerenePark(false);
            }}
            extendedTitle={homeList.Crescent.extendedTitle}
            location={homeList.Crescent.location}
            cssClasses={classNames("", {
              "hover:border-b-2 border-white pb-2 -mb-2 hover:-mb-[10px]":
                !showCrescent,
              "border-b-2 border-white pb-2 -mb-[10px]": showCrescent,
            })}
            arrowCssClasses={classNames("", {
              hidden: !showCrescent,
            })}
            homeIconUrl="/icons/beach-white.svg"
            homeIconAlt="Beach umbrella icon"
          />

          {/* eastlands */}
          <Button
            desktopHomesForm
            onClick={() => {
              setShowCrescent(false);
              setShowEastlands(true);
              setShowSerenePark(false);
            }}
            extendedTitle={homeList.Eastlands.extendedTitle}
            location={homeList.Eastlands.location}
            cssClasses={classNames("", {
              "hover:border-b-2 border-white pb-2 -mb-2 hover:-mb-[10px]":
                !showEastlands,
              "border-b-2 border-white pb-2 -mb-[10px]": showEastlands,
            })}
            arrowCssClasses={classNames("", {
              hidden: !showEastlands,
            })}
            homeIconUrl="/icons/flower-white.svg"
            homeIconAlt="Flower icon"
          />

          {/* serenepark */}
          <Button
            desktopHomesForm
            onClick={() => {
              setShowCrescent(false);
              setShowEastlands(false);
              setShowSerenePark(true);
            }}
            extendedTitle={homeList.Serenepark.extendedTitle}
            location={homeList.Serenepark.location}
            cssClasses={classNames("", {
              "hover:border-b-2 border-white pb-2 -mb-2 hover:-mb-[10px]":
                !showSerenePark,
              "border-b-2 border-white pb-2 -mb-[10px]": showSerenePark,
            })}
            arrowCssClasses={classNames("", {
              hidden: !showSerenePark,
            })}
            homeIconUrl="/icons/leaves-white.svg"
            homeIconAlt="Leaves icon"
          />
        </div>
        {showCrescent && (
          <div className="grid grid-cols-2 gap-10 mt-10">
            <div>
              <ul className="flex flex-col gap-2 mb-10">
                <li className="grid grid-cols-[80px_1fr]">
                  <p className="text-white text-larger font-light">Email:</p>
                  <Link
                    href="mailto:jumireej@carevita.co.za"
                    className="text-white text-larger hover:underline underline-offset-4 decoration-1"
                  >
                    {homeList.Crescent.email}
                  </Link>
                </li>
                <li className="grid grid-cols-[80px_1fr]">
                  <p className="text-white text-larger font-light">Phone:</p>
                  <Link
                    href="tel:+27445331234"
                    className="text-white text-larger"
                  >
                    {homeList.Crescent.phone}
                  </Link>
                </li>
              </ul>
              <form action="" method="POST" className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-larger text-white font-thin"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Full name"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-larger text-white font-thin"
                  >
                    Email:
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    required
                    placeholder="Email address"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-larger text-white font-thin"
                  >
                    Message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Type your message here"
                    className="pl-2 py-1.5"
                    rows={3}
                  />
                </div>
                <div className="flex justify-between mt-5">
                  <Button form>Submit</Button>
                </div>
              </form>
            </div>
            <div className="overflow-hidden">
              <Image
                src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/placeholders/_MG_9972.jpg"
                alt=""
                width={1000}
                height={1000}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}
        {showEastlands && (
          <div className="grid grid-cols-2 gap-10 mt-10">
            <div>
              <ul className="flex flex-col gap-2 mb-10">
                <li className="grid grid-cols-[80px_1fr]">
                  <p className="text-white text-larger font-light">Email:</p>
                  <Link
                    href="mailto:eastlands@carevita.co.za"
                    className="text-white text-larger hover:underline underline-offset-4 decoration-1"
                  >
                    {homeList.Eastlands.email}
                  </Link>
                </li>
                <li className="grid grid-cols-[80px_1fr]">
                  <p className="text-white text-larger font-light">Phone:</p>
                  <Link
                    href="tel:1234567890"
                    className="text-white text-larger"
                  >
                    {homeList.Eastlands.phone}
                  </Link>
                </li>
              </ul>
              <form action="" method="POST" className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-larger text-white font-thin"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Full name"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-larger text-white font-thin"
                  >
                    Email:
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    required
                    placeholder="Email address"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-larger text-white font-thin"
                  >
                    Message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Type your message here"
                    className="pl-2 py-1.5"
                    rows={3}
                  />
                </div>
                <div className="flex justify-between mt-5">
                  <Button form>Submit</Button>
                </div>
              </form>
            </div>
            <div className="overflow-hidden">
              <Image
                src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/placeholders/_MG_9993.JPG"
                alt=""
                width={1000}
                height={1000}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}
        {showSerenePark && (
          <div className="grid grid-cols-2 gap-10 mt-10">
            <div>
              <ul className="flex flex-col gap-2 mb-10">
                <li className="grid grid-cols-[80px_1fr]">
                  <p className="text-white text-larger font-light">Email:</p>
                  <Link
                    href="mailto:serenepark@carevita.co.za"
                    className="text-white text-larger hover:underline underline-offset-4 decoration-1"
                  >
                    {homeList.Serenepark.email}
                  </Link>
                </li>
                <li className="grid grid-cols-[80px_1fr]">
                  <p className="text-white text-larger font-light">Phone:</p>
                  <Link
                    href="tel:1234567890"
                    className="text-white text-larger"
                  >
                    {homeList.Serenepark.phone}
                  </Link>
                </li>
              </ul>
              <form action="" method="POST" className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-larger text-white font-thin"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Full name"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-larger text-white font-thin"
                  >
                    Email:
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    required
                    placeholder="Email address"
                    className="pl-2 py-1.5"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-larger text-white font-thin"
                  >
                    Message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Type your message here"
                    className="pl-2 py-1.5"
                    rows={3}
                  />
                </div>
                <div className="flex justify-between mt-5">
                  <Button form>Submit</Button>
                </div>
              </form>
            </div>
            <div className="overflow-hidden">
              <Image
                src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/placeholders/_MG_9890.jpg"
                alt=""
                width={1000}
                height={1000}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
      <ul className="mt-10 pt-10 border-t border-white flex flex-col gap-6 max-w-[1400px] mx-auto tabletLarge:gap-2">
        <li className="grid grid-cols-[160px_1fr]">
          <p className="text-white font-light">General enquiries:</p>
          <Link
            href="mailto:info@carevita.co.za"
            className="text-white tabletLarge:hover:underline underline-offset-4 decoration-1 w-[170px] p-2 -m-2 tabletLarge:w-[140px] tabletLarge:p-0 tabletLarge:m-0"
          >
            info@carevita.co.za
          </Link>
        </li>
        <li className="grid grid-cols-[160px_1fr]">
          <p className="text-white font-light">Account queries:</p>
          <Link
            href="mailto:accounts@carevita.co.za"
            className="text-white tabletLarge:hover:underline underline-offset-4 decoration-1 w-[210px] p-2 -m-2 tabletLarge:w-[182px] tabletLarge:p-0 tabletLarge:m-0"
          >
            accounts@carevita.co.za
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ContactForm;
