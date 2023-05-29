import { useState } from "react";
import Link from "next/link";

import Button from "../../../../button";

interface Props {
  cssClasses?: string;
}

import homeList from "../../../../../data/the-crescent-extended-data.json";
import ImageContainer from "@/components/utils/image-container";

const ContactFormCrescentPage = ({ cssClasses }: Props) => {
  const [showMessage, setShowMessage] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  return (
    <div className={`${cssClasses}`}>
      <div className="mt-10 max-w-[1400px] mx-auto flex flex-col gap-8">
        <ul className="flex flex-col gap-6 mt-4 tablet:gap-4 desktop:gap-2">
          <li className="grid grid-cols-[80px_1fr]">
            <p className="text-white text-larger font-light">Email:</p>
            <div className="place-items-start mr-auto">
              {!showEmail && (
                <p
                  className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer"
                  onClick={() => setShowEmail(true)}
                >
                  Show email address
                </p>
              )}
              {showEmail && (
                <Link
                  href="mailto:jumireej@carevita.co.za"
                  className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0 tabletLarge:hover:underline underline-offset-8 decoration-1"
                >
                  {homeList.email}
                </Link>
              )}
            </div>
          </li>
          <li className="grid grid-cols-[80px_1fr]">
            <p className="text-white text-larger font-light">Phone:</p>
            <div className="place-items-start mr-auto">
              {!showPhone && (
                <p
                  className="text-larger font-thin italic text-white  underline-offset-8 decoration-1 tabletLarge:hover:underline tabletLarge:cursor-pointer"
                  onClick={() => setShowPhone(true)}
                >
                  Show phone number
                </p>
              )}
              {showPhone && (
                <Link
                  href="tel:+27445331234"
                  className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0"
                >
                  {homeList.phone}
                </Link>
              )}
            </div>
          </li>
        </ul>
        <p className="text-white">
          Please fill out the form below, and our staff from{" "}
          <span className="font-light text-white">
            {homeList.extendedTitle}
          </span>{" "}
          will be in touch with you ASAP...
        </p>
        <form action="" method="POST" className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <label htmlFor="name" className="text-larger text-white font-thin">
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
          {showMessage && (
            <>
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
            </>
          )}
          {showMessage && (
            <Button
              form
              onClick={() => setShowMessage(false)}
              cssClasses="mr-auto"
            >
              Submit
            </Button>
          )}
        </form>
        {!showMessage && (
          <Button
            formNext
            onClick={() => setShowMessage(true)}
            cssClasses="mr-auto"
          />
        )}
      </div>
    </div>
  );
};

export default ContactFormCrescentPage;
