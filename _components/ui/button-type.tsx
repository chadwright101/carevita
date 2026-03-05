"use client";

import { useFormStatus } from "react-dom";
import Image from "next/image";
import { buttonStyles } from "@/_styles/button-styles";
import classNames from "classnames";

interface Props {
  children?: React.ReactNode;
  cssClasses?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
  disabled?: boolean;
  backgroundColor?: "blue" | "green" | "lightGreen" | "black" | "red";
  strokeColor?: "black" | "red";
  iconArrow?: boolean;
  blackSpinner?: boolean;
}

const ButtonType = ({
  children,
  cssClasses,
  onClick,
  type = "submit",
  disabled,
  backgroundColor,
  strokeColor,
  iconArrow,
  blackSpinner,
}: Props) => {
  const { pending } = useFormStatus();

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonStyles(
        cssClasses,
        disabled,
        pending,
        backgroundColor,
        type,
        strokeColor,
      )}
      disabled={disabled || pending}
    >
      {pending && type === "submit" ? (
        <div className="flex w-full justify-center items-center py-[1.5px]">
          <div
            className={classNames(
              blackSpinner ? "spinner-black-medium" : "spinner-large",
            )}
          />
        </div>
      ) : (
        <>
          {children}
          {iconArrow && (
            <Image
              src="/assets/icons/arrow_forward-white.svg"
              alt="Arrow icon"
              width={20}
              height={20}
            />
          )}
        </>
      )}
    </button>
  );
};

export default ButtonType;
