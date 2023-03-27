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
}

const Button = ({ children, form, cssClasses, url, onClick }: Props) => {
  if (form) {
    return (
      <button
        className={`bg-green text-white hover:bg-lightGreen ${cssClasses}`}
        type="submit"
      >
        <Link href={url!}>{children || "Next"}</Link>
        <Image
          src="/icons/arrow_forward.svg"
          alt="Arrow icon"
          width={16}
          height={16}
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
