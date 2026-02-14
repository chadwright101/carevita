"use client";

import Link from "next/link";
import { useState } from "react";

import classNames from "classnames";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { getEmailFetcher } from "@/_lib/contact-helpers";
import { ShowEmailAddressProps } from "@/_types/general-types";

const ShowEmailAddress = ({
  buttonClasses,
  linkClasses,
  property,
  blackText = false,
}: ShowEmailAddressProps) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [showEmail, setShowEmail] = useState("Show email address");
  const [showSpinnerEmail, setShowSpinnerEmail] = useState(false);

  const handleShowEmailAddress = async () => {
    setShowSpinnerEmail(true);

    try {
      let recaptchaToken: string | undefined;

      if (executeRecaptcha) {
        recaptchaToken = await executeRecaptcha("fetch_email");
      }

      const emailFetcher = getEmailFetcher(property);
      const emailAddress =
        (await emailFetcher(recaptchaToken)) || "Email not found";
      setShowEmail(emailAddress);
    } catch (error) {
      console.error("Error fetching email:", error);
      setShowEmail("Email not available");
    }

    setShowSpinnerEmail(false);
  };

  if (showEmail === "Show email address") {
    return (
      <button
        onClick={() => handleShowEmailAddress()}
        className={classNames(
          "text-larger p-2 -m-2 font-extralight italic desktop:hover:opacity-80 desktop:cursor-pointer desktop:p-0 desktop:m-0 desktop:text-paragraph ease-in-out duration-300",
          blackText ? "text-black" : "text-white",
          buttonClasses,
        )}
        aria-label="Show email address"
      >
        {showSpinnerEmail ? (
          <div className="py-[1px] translate-y-[3px]">
            <div className={blackText ? "spinner-black" : "spinner"}></div>
          </div>
        ) : (
          showEmail
        )}
      </button>
    );
  } else {
    return (
      <Link
        href={`mailto:${showEmail}`}
        className={classNames(
          "text-larger p-2 -m-2 font-extralight desktop:hover:opacity-80 desktop:cursor-pointer desktop:p-0 desktop:m-0 desktop:text-paragraph ease-in-out duration-300",
          blackText ? "text-black" : "text-white",
          linkClasses,
        )}
      >
        {showEmail}
      </Link>
    );
  }
};

export default ShowEmailAddress;
