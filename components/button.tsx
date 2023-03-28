import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

import arrow from "../public/icons/arrow_forward.svg";

interface Props {
  children?: ReactNode;
  form?: boolean;
  cssClasses?: string;
  url?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  backgroundColour?: string;
  textColour?: string;
  mobileHomesForm?: boolean;
  formBack?: boolean;
}

const Button = ({
  children,
  form,
  cssClasses,
  url,
  onClick,
  mobileHomesForm,
  formBack,
}: Props) => {
  if (form) {
    return (
      <button
        className={`bg-green text-larger text-white px-6 py-4 flex gap-6 items-center ${cssClasses}`}
        type="submit"
      >
        {children || "Next"}
        <Image
          src="/icons/arrow_forward-white.svg"
          alt="Arrow icon"
          width={20}
          height={20}
        ></Image>
      </button>
    );
  } else if (formBack) {
    return (
      <button
        className={`bg-lightGreen text-larger text-white px-6 py-4 ${cssClasses}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  } else if (mobileHomesForm) {
    return (
      <button
        className={`bg-white text-larger text-blue px-6 py-4 flex gap-4 justify-between items-center w-full ${cssClasses}`}
        onClick={onClick}
      >
        {children}
        <Image
          src="/icons/arrow_forward-blue.svg"
          alt="Arrow icon"
          width={32}
          height={32}
        ></Image>
      </button>
    );
  } else {
    return (
      <button
        className={`px-12 py-2.5 text-subheading rounded-[22px] bg-blue text-white drop-shadow-md border-lightGreen border-[2px] tablet:hover:bg-green tablet:px-10 tablet:py-1.5 tablet:rounded-[20px] ${cssClasses}`}
      >
        <Link href={url!}>{children || "View More"}</Link>
      </button>
    );
  }
};

export default Button;
