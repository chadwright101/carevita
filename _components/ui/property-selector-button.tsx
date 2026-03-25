"use client";

import Image from "next/image";
import classNames from "classnames";

interface PropertySelectorButtonProps {
  extendedTitle: string;
  location: string;
  onClick: () => void;
  cssClasses?: string;
  mobile?: boolean;
}

const PropertySelectorButton = ({
  extendedTitle,
  location,
  onClick,
  cssClasses,
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
        <span className="text-blue flex flex-col">
          {extendedTitle}
          <span className="text-blue text-paragraph font-extralight">
            {location}
          </span>
        </span>
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
      <div className={classNames("flex flex-col", cssClasses)}>
        <h4 className="text-white text-larger">{extendedTitle}</h4>
        <p className="text-white text-smaller font-extralight">{location}</p>
      </div>
    </button>
  );
};

export default PropertySelectorButton;
