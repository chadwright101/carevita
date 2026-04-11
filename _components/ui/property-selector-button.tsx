"use client";

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
        <svg width="32" height="32" viewBox="0 0 16 16" fill="#134266" xmlns="http://www.w3.org/2000/svg" className="min-w-[32px]">
          <path d="M8 16L6.575 14.6L12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16Z" />
        </svg>
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
