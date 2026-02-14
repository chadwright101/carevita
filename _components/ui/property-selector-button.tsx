"use client";

import Image from "next/image";
import classNames from "classnames";

interface PropertySelectorButtonProps {
  extendedTitle: string;
  location: string;
  homeIconUrl: string;
  homeIconAlt: string;
  onClick: () => void;
  cssClasses?: string;
  arrowCssClasses?: string;
  mobile?: boolean;
}

const PropertySelectorButton = ({
  extendedTitle,
  location,
  homeIconUrl,
  homeIconAlt,
  onClick,
  cssClasses,
  arrowCssClasses,
  mobile = false,
}: PropertySelectorButtonProps) => {
  if (mobile) {
    return (
      <button
        className={classNames(
          "bg-white text-larger px-6 py-4 flex gap-4 justify-between items-center w-full",
          cssClasses,
        )}
        onClick={onClick}
      >
        <div className="flex items-center gap-4">
          <Image src={homeIconUrl} alt={homeIconAlt} width={50} height={50} />
          <span className="text-blue flex flex-col">
            {extendedTitle}
            <span className="text-blue text-paragraph font-extralight">
              {location}
            </span>
          </span>
        </div>
        <Image
          src="/assets/icons/arrow_forward-blue.svg"
          alt="Arrow icon"
          width={32}
          height={32}
          className="min-w-[32px] h-auto"
        />
      </button>
    );
  }

  return (
    <button className="text-larger flex flex-col" onClick={onClick}>
      <div className="flex flex-col gap-2">
        <div className={classNames("flex gap-3 items-center", cssClasses)}>
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
            <p className="text-white text-smaller font-extralight">
              {location}
            </p>
          </div>
        </div>
        <Image
          src="/assets/icons/arrow_drop_down.svg"
          alt="Arrow icon"
          width={23}
          height={23}
          className={classNames("place-self-center mt-3", arrowCssClasses)}
        />
      </div>
    </button>
  );
};

export default PropertySelectorButton;
