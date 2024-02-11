import { useState } from "react";

import HomePageDesktopContactForm from "./desktop/home-page-desktop-contact-form";
import HomePageMobileContactForm from "./mobile/home-page-mobile-contact-form";
import Link from "next/link";

const HomePageContactForm = () => {
  const [showAccountsEmail, setShowAccountsEmail] = useState("");
  const [showGeneralEmail, setShowGeneralEmail] = useState("");

  return (
    <div>
      <HomePageMobileContactForm />
      <HomePageDesktopContactForm />
      <ul className="mt-10 pt-10 border-t border-white flex flex-col gap-8 phone:gap-6 max-w-[1400px] mx-auto tabletLarge:gap-2">
        <li className="grid grid-cols-1 gap-2 text-larger place-items-center phone:place-items-start phone:gap-0 phone:grid-cols-[175px_1fr] desktopSmall:text-paragraph desktop:grid-cols-[165px_1fr]">
          <p className="text-white text-center font-light text-larger desktopSmall:text-paragraph">
            General enquiries:
          </p>
          {showGeneralEmail ? (
            <Link
              href={`mailto:${showGeneralEmail}`}
              className="text-larger font-thin italic text-white underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer desktopSmall:text-paragraph"
            >
              {showGeneralEmail}
            </Link>
          ) : (
            <button
              className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer desktopSmall:text-paragraph"
              onClick={async () => {
                const response = await fetch("/api/contact-details-general");
                const data = await response.json();
                const email = data.general;
                setShowGeneralEmail(email);
              }}
            >
              Show email address
            </button>
          )}
        </li>
        <li className="grid grid-cols-1 gap-2 text-larger place-items-center phone:place-items-start phone:gap-0 phone:grid-cols-[175px_1fr] desktopSmall:text-paragraph desktop:grid-cols-[165px_1fr]">
          <p className="text-white text-center font-light text-larger desktopSmall:text-paragraph">
            Account queries:
          </p>
          {showAccountsEmail ? (
            <Link
              href={`mailto:${showAccountsEmail}`}
              className="text-larger font-thin italic text-white underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer desktopSmall:text-paragraph"
            >
              {showAccountsEmail}
            </Link>
          ) : (
            <button
              className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer desktopSmall:text-paragraph"
              onClick={async () => {
                const response = await fetch("/api/contact-details-general");
                const data = await response.json();
                const email = data.accounts;
                setShowAccountsEmail(email);
              }}
            >
              Show email address
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default HomePageContactForm;
