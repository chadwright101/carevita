"use client";

import HomePageDesktopContactForm from "./desktop/home-page-desktop-contact-form";
import HomePageMobileContactForm from "./mobile/home-page-mobile-contact-form";
import ShowEmailAddress from "@/_components/ui/contact/show-email-address";

const HomePageContactForm = () => {
  return (
    <div>
      <HomePageMobileContactForm />
      <HomePageDesktopContactForm />
      <ul className="mt-10 pt-10 border-t border-white flex flex-col gap-8 phone:gap-6 max-w-[1280px] mx-auto tablet:gap-2">
        <li className="grid gap-2 text-larger place-items-center min-[500px]:place-items-start min-[500px]:gap-0 min-[500px]:grid-cols-[175px_1fr] desktop:text-paragraph desktop:grid-cols-[165px_1fr]">
          <p className="text-white text-center font-light text-larger desktop:text-paragraph">
            General enquiries:
          </p>
          <ShowEmailAddress property="general" />
        </li>
        <li className="grid gap-2 text-larger place-items-center min-[500px]:place-items-start min-[500px]:gap-0 min-[500px]:grid-cols-[175px_1fr] desktop:text-paragraph desktop:grid-cols-[165px_1fr]">
          <p className="text-white text-center font-light text-larger desktop:text-paragraph">
            Account queries:
          </p>
          <ShowEmailAddress property="accounts" />
        </li>
      </ul>
    </div>
  );
};

export default HomePageContactForm;
