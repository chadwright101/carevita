"use client";

import classNames from "classnames";
import Link from "next/link";

interface Props {
  cssClasses?: string;
}

const RecaptchaNotice = ({ cssClasses }: Props) => {
  return (
    <p className={classNames("text-smallest", cssClasses)}>
      This site is protected by reCAPTCHA and the Google{" "}
      <Link
        href="https://policies.google.com/privacy"
        target="_blank"
        className="underline text-white underline-offset-4 desktop:hover:opacity-[80%] ease-in-out duration-300"
      >
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link
        href="https://policies.google.com/terms"
        target="_blank"
        className="underline text-white underline-offset-4 desktop:hover:opacity-[80%] ease-in-out duration-300"
      >
        Terms of Service
      </Link>{" "}
      apply.
    </p>
  );
};

export default RecaptchaNotice;
