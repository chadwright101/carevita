import { useState } from "react";
import Link from "next/link";

import ContactFormCrescentPage from "./contact-form-crescent";
import Button from "../button";
import ImageContainer from "../utils/image-container";

import classNames from "classnames";

import crescentData from "@/data/crescent-data.json";
import eastlandsData from "@/data/eastlands-data.json";
import sereneData from "@/data/serene-data.json";

interface Props {
  cssClasses?: string;
  crescent?: boolean;
  eastlands?: boolean;
  serenePark?: boolean;
}

const ContactForm = ({
  cssClasses,
  crescent,
  eastlands,
  serenePark,
}: Props) => {
  const [showCrescent, setShowCrescent] = useState(false);
  const [showEastlands, setShowEastlands] = useState(false);
  const [showSerenePark, setShowSerenePark] = useState(false);
  const [showAccountsEmail, setShowAccountsEmail] = useState(false);
  const [showGeneralEmail, setShowGeneralEmail] = useState(false);

  if (crescent) {
    return <ContactFormCrescentPage data={crescentData} />;
  } else {
    return (
      <div className={`${cssClasses}`}>
        {/* mobile view */}
        <div className="desktop:hidden">
          {/* the crescent form */}
          <div className="mt-10 max-w-[1400px] mx-auto">
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
                  extendedTitle={crescentData.general.title}
                  location={crescentData.general.location}
                  homeIconUrl="/icons/beach-blue.svg"
                  homeIconAlt="Beach umbrella icon"
                />
              </>
            )}

            {showCrescent && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col">
                  <h4 className="text-white text-center font-light tablet:text-left">
                    {crescentData.general.title}
                  </h4>
                  <p className="text-white text-center tablet:text-left">
                    {crescentData.general.location}
                  </p>
                </div>
                <ul className="flex flex-col gap-6 mt-4 tablet:gap-4 desktop:gap-2">
                  <li className="grid grid-cols-[80px_1fr]">
                    <p className="text-white text-larger font-light">Email:</p>
                    <div className="place-items-start">
                      <Link
                        href="mailto:jumireej@carevita.co.za"
                        className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0"
                      >
                        {crescentData.general.email}
                      </Link>
                    </div>
                  </li>
                  <li className="grid grid-cols-[80px_1fr]">
                    <p className="text-white text-larger font-light">Phone:</p>
                    <div className="place-items-start">
                      <Link
                        href="tel:+27445331234"
                        className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0"
                      >
                        {crescentData.general.phone}
                      </Link>
                    </div>
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

          {/* eastlands form */}

          <div className="mt-10 max-w-[1400px] mx-auto">
            {!showCrescent && !showEastlands && !showSerenePark && (
              <Button
                mobileHomesForm
                onClick={() => setShowEastlands(!showEastlands)}
                cssClasses="text-left"
                extendedTitle={eastlandsData.general.title}
                location={eastlandsData.general.location}
                homeIconUrl="/icons/flower-blue.svg"
                homeIconAlt="Flower icon"
              />
            )}

            {showEastlands && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col">
                  <h4 className="text-white text-center font-light tablet:text-left">
                    {eastlandsData.general.title}
                  </h4>
                  <p className="text-white text-center tablet:text-left">
                    {eastlandsData.general.location}
                  </p>
                </div>
                <ul className="flex flex-col gap-6 mt-4 tablet:gap-4 desktop:gap-2">
                  <li className="grid grid-cols-[80px_1fr]">
                    <p className="text-white text-larger font-light">Email:</p>
                    <div className="place-items-start">
                      <Link
                        href="mailto:eastlands@carevita.co.za"
                        className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0"
                      >
                        {eastlandsData.general.email}
                      </Link>
                    </div>
                  </li>
                  <li className="grid grid-cols-[80px_1fr]">
                    <p className="text-white text-larger font-light">Phone:</p>
                    <div className="place-items-start">
                      <Link
                        href="tel:1234567890"
                        className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0"
                      >
                        {eastlandsData.general.phone}
                      </Link>
                    </div>
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

          <div className="mt-10 max-w-[1400px] mx-auto">
            {!showCrescent && !showEastlands && !showSerenePark && (
              <Button
                mobileHomesForm
                onClick={() => setShowSerenePark(!showSerenePark)}
                cssClasses="text-left"
                extendedTitle={sereneData.general.title}
                location={sereneData.general.location}
                homeIconUrl="/icons/leaves-blue.svg"
                homeIconAlt="Leaves icon"
              />
            )}

            {showSerenePark && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col">
                  <h4 className="text-white text-center font-light tablet:text-left">
                    {sereneData.general.title}
                  </h4>
                  <p className="text-white text-center tablet:text-left">
                    {sereneData.general.location}
                  </p>
                </div>
                <ul className="flex flex-col  gap-6 mt-4 tablet:gap-4 desktop:gap-2">
                  <li className="grid grid-cols-[80px_1fr]">
                    <p className="text-white text-larger font-light">Email:</p>
                    <div className="place-items-start">
                      <Link
                        href="mailto:serenepark@carevita.co.za"
                        className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0"
                      >
                        {sereneData.general.email}
                      </Link>
                    </div>
                  </li>
                  <li className="grid grid-cols-[80px_1fr]">
                    <p className="text-white text-larger font-light">Phone:</p>
                    <div className="place-items-start">
                      <Link
                        href="tel:1234567890"
                        className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0"
                      >
                        {sereneData.general.phone}
                      </Link>
                    </div>
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
              extendedTitle={crescentData.general.title}
              location={crescentData.general.location}
              cssClasses={classNames("transition-all text-left", {
                "hover:scale-105 hover:-mb-[10px]": !showCrescent,
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
              extendedTitle={eastlandsData.general.title}
              location={eastlandsData.general.location}
              cssClasses={classNames("transition-all", {
                "hover:scale-105 hover:-mb-[10px]": !showEastlands,
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
              extendedTitle={sereneData.general.title}
              location={sereneData.general.location}
              cssClasses={classNames("transition-all", {
                "hover:scale-105 hover:-mb-[10px]": !showSerenePark,
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
                      {crescentData.general.email}
                    </Link>
                  </li>
                  <li className="grid grid-cols-[80px_1fr]">
                    <p className="text-white text-larger font-light">Phone:</p>
                    <Link
                      href="tel:+27445331234"
                      className="text-white text-larger"
                    >
                      {crescentData.general.phone}
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
                <ImageContainer
                  src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/the-crescent/sliders/gallery/9U7A6120.jpg"
                  alt="Contact The Crescent"
                  width={505}
                  height={680}
                  cssClasses="object-cover w-full h-full"
                  desktop={35}
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
                      {eastlandsData.general.email}
                    </Link>
                  </li>
                  <li className="grid grid-cols-[80px_1fr]">
                    <p className="text-white text-larger font-light">Phone:</p>
                    <Link
                      href="tel:1234567890"
                      className="text-white text-larger"
                    >
                      {eastlandsData.general.phone}
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
                <ImageContainer
                  src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/placeholders/_MG_9993.JPG"
                  alt="Contact Eastlands"
                  width={505}
                  height={680}
                  cssClasses="object-cover w-full h-full"
                  desktop={35}
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
                      {sereneData.general.email}
                    </Link>
                  </li>
                  <li className="grid grid-cols-[80px_1fr]">
                    <p className="text-white text-larger font-light">Phone:</p>
                    <Link
                      href="tel:1234567890"
                      className="text-white text-larger"
                    >
                      {sereneData.general.phone}
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
                <ImageContainer
                  src="https://the-wright-designs-website-images.s3.af-south-1.amazonaws.com/carevita/placeholders/_MG_9890.jpg"
                  alt="Contact Serene Park"
                  width={505}
                  height={680}
                  cssClasses="object-cover w-full h-full"
                  desktop={35}
                />
              </div>
            </div>
          )}
        </div>
        <ul className="mt-10 pt-10 border-t border-white flex flex-col gap-8 phone:gap-6 max-w-[1400px] mx-auto tabletLarge:gap-2">
          <li className="grid grid-cols-1 gap-2 text-larger place-items-center phone:place-items-start phone:gap-0 phone:grid-cols-[175px_1fr] desktopSmall:text-paragraph desktop:grid-cols-[165px_1fr]">
            <p className="text-white text-center font-light text-larger desktopSmall:text-paragraph">
              General enquiries:
            </p>
            {!showGeneralEmail && (
              <p
                className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer desktopSmall:text-paragraph"
                onClick={() => setShowGeneralEmail(true)}
              >
                Show email address
              </p>
            )}
            {showGeneralEmail && (
              <Link
                href="mailto:info@carevita.co.za"
                className="text-white tabletLarge:hover:underline underline-offset-4 decoration-1 w-auto p-2 -m-2 tabletLarge:w-[140px] tabletLarge:p-0 tabletLarge:m-0"
              >
                info@carevita.co.za
              </Link>
            )}
          </li>
          <li className="grid grid-cols-1 gap-2 text-larger place-items-center phone:place-items-start phone:gap-0 phone:grid-cols-[175px_1fr] desktopSmall:text-paragraph desktop:grid-cols-[165px_1fr]">
            <p className="text-white text-center font-light text-larger desktopSmall:text-paragraph">
              Account queries:
            </p>
            {!showAccountsEmail && (
              <p
                className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer desktopSmall:text-paragraph"
                onClick={() => setShowAccountsEmail(true)}
              >
                Show email address
              </p>
            )}
            {showAccountsEmail && (
              <Link
                href="mailto:accounts@carevita.co.za"
                className="text-white tabletLarge:hover:underline underline-offset-4 decoration-1 w-auto p-2 -m-2 tabletLarge:w-[182px] tabletLarge:p-0 tabletLarge:m-0"
              >
                accounts@carevita.co.za
              </Link>
            )}
          </li>
        </ul>
      </div>
    );
  }
};

export default ContactForm;
