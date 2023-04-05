import { useState } from "react";
import Link from "next/link";

import Button from "../../button";

interface Props {
  cssClasses?: string;
}

import homeList from "../../../data/carevita-data.json";

const ContactFormCrescentPage = ({ cssClasses }: Props) => {
  const [showCrescent, setShowCrescent] = useState(false);
  return (
    <div className={`${cssClasses}`}>
      <div className="mt-10 max-w-[1400px] mx-auto flex flex-col gap-8">
        <ul className="flex flex-col gap-6 mt-4 tablet:gap-4 desktop:gap-2">
          <li className="grid grid-cols-[80px_1fr]">
            <p className="text-white text-larger font-light">Email:</p>
            <div className="place-items-start">
              <Link
                href="mailto:jumireej@carevita.co.za"
                className="text-white text-larger p-4 -m-4 tablet:p-2 tablet:-m-2 desktop:p-0 desktop:m-0"
              >
                {homeList.basicHomesData.Crescent.email}
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
                {homeList.basicHomesData.Crescent.phone}
              </Link>
            </div>
          </li>
        </ul>
        <p className="text-white">
          Please fill out the form below, and our staff from{" "}
          <span className="font-light text-white">
            The Crescent Retirement Lodge
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
          {showCrescent && (
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
          {showCrescent && (
            <Button
              form
              onClick={() => setShowCrescent(false)}
              cssClasses="mr-auto"
            >
              Submit
            </Button>
          )}
        </form>
        {!showCrescent && (
          <Button
            formNext
            onClick={() => setShowCrescent(true)}
            cssClasses="mr-auto"
          />
        )}
      </div>
    </div>
  );
};

export default ContactFormCrescentPage;
