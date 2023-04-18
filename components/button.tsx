import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

interface Props {
  children?: ReactNode;
  form?: boolean;
  cssClasses?: string;
  url?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  backgroundColour?: string;
  textColour?: string;
  mobileHomesForm?: boolean;
  desktopHomesForm?: boolean;
  formBack?: boolean;
  formNext?: boolean;
  extendedTitle?: string;
  location?: string;
  arrowCssClasses?: string;
  homeIconUrl?: any;
  homeIconAlt?: any;
}

const Button = ({
  children,
  form,
  cssClasses,
  url,
  onClick,
  mobileHomesForm,
  desktopHomesForm,
  formBack,
  formNext,
  extendedTitle,
  location,
  arrowCssClasses,
  homeIconUrl,
  homeIconAlt,
}: Props) => {
  if (form) {
    return (
      <button
        className={`bg-green text-subheading font-thin text-white px-6 py-2.5 flex gap-6 items-center tabletLarge:hover:bg-lightGreen ${cssClasses}`}
        type="submit"
      >
        {children}
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
        className={`bg-lightGreen text-subheading font-thin text-white px-6 py-2.5 ${cssClasses}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  } else if (formNext) {
    return (
      <button
        className={`bg-green text-subheading font-thin text-white px-6 py-2.5 flex gap-6 items-center tabletLarge:hover:bg-lightGreen ${cssClasses}`}
        onClick={onClick}
      >
        Next
        <Image
          src="/icons/arrow_forward-white.svg"
          alt="Arrow icon"
          width={20}
          height={20}
        />
      </button>
    );
  } else if (mobileHomesForm) {
    return (
      <button
        className={`bg-white text-larger px-6 py-4 flex gap-4 justify-between items-center w-full ${cssClasses}`}
        onClick={onClick}
      >
        <div className="flex items-center gap-4">
          <Image src={homeIconUrl} alt={homeIconAlt} width={50} height={50} />
          <span className="text-blue flex flex-col">
            {extendedTitle}
            <span className="text-blue text-paragraph font-thin">
              {location}
            </span>
          </span>
        </div>
        <Image
          src="/icons/arrow_forward-blue.svg"
          alt="Arrow icon"
          width={32}
          height={32}
          className="min-w-[32px] h-auto"
        />
      </button>
    );
  } else if (desktopHomesForm) {
    return (
      <button className="text-larger flex flex-col" onClick={onClick}>
        <div className="flex flex-col gap-2">
          <div className={`flex gap-3 items-center ${cssClasses}`}>
            <Image
              src={homeIconUrl}
              alt={homeIconAlt}
              width={50}
              height={50}
              className="-translate-x-[4px]"
            />
            <div>
              <h4 className="text-white text-larger flex flex-col">
                {extendedTitle}
              </h4>
              <p className="text-white text-smaller font-thin">{location}</p>
            </div>
          </div>
          <Image
            src="/icons/arrow_drop_down.svg"
            alt="Arrow icon"
            width={23}
            height={23}
            className={`place-self-center mt-3 ${arrowCssClasses}`}
          />
        </div>
      </button>
    );
  } else {
    return (
      <button className={`mx-auto ${cssClasses}`}>
        <Link
          href={url!}
          className="px-12 py-2.5 text-subheading font-thin bg-green text-white drop-shadow-md tabletLarge:hover:bg-lightGreen tablet:px-10"
        >
          {children || "View More"}
        </Link>
      </button>
    );
  }
};

export default Button;
