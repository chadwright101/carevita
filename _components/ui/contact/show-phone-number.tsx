"use client";

import Link from "next/link";
import { useState } from "react";

import classNames from "classnames";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { getPhoneFetcher } from "@/_lib/contact-helpers";
import { ShowPhoneNumberProps } from "@/_types/general-types";

const ShowPhoneNumber = ({
  buttonClasses,
  linkClasses,
  property,
  blackText = false,
}: ShowPhoneNumberProps) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [showPhone, setShowPhone] = useState("Show phone number");
  const [showSpinnerPhone, setShowSpinnerPhone] = useState(false);

  const handleShowPhoneNumbers = async () => {
    setShowSpinnerPhone(true);

    try {
      let recaptchaToken: string | undefined;

      if (executeRecaptcha) {
        recaptchaToken = await executeRecaptcha("fetch_phone");
      }

      const phoneFetcher = getPhoneFetcher(property);
      const phoneNumber =
        (await phoneFetcher(recaptchaToken)) || "Phone number not found";
      setShowPhone(phoneNumber);
    } catch (error) {
      console.error("Error fetching phone:", error);
      setShowPhone("Phone not available");
    }

    setShowSpinnerPhone(false);
  };

  if (showPhone === "Show phone number") {
    return (
      <button
        onClick={() => handleShowPhoneNumbers()}
        className={classNames(
          "text-larger p-2 -m-2 font-extralight italic desktop:hover:opacity-80 desktop:cursor-pointer desktop:p-0 desktop:m-0 desktop:text-paragraph ease-in-out duration-300",
          blackText ? "text-black" : "text-white",
          buttonClasses,
        )}
        aria-label="Show phone number"
      >
        {showSpinnerPhone ? (
          <div className="py-[1px] translate-y-[3px]">
            <div className={blackText ? "spinner-black" : "spinner"}></div>
          </div>
        ) : (
          showPhone
        )}
      </button>
    );
  } else {
    return (
      <Link
        href={`tel:${showPhone}`}
        className={classNames(
          "text-larger p-2 -m-2 font-light desktop:hover:opacity-80 desktop:cursor-pointer desktop:p-0 desktop:m-0 desktop:text-paragraph ease-in-out duration-300",
          blackText ? "text-black" : "text-white",
          linkClasses,
        )}
      >
        {showPhone}
      </Link>
    );
  }
};

export default ShowPhoneNumber;
