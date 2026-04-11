"use client";

import { useFormStatus } from "react-dom";
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
            <svg width="20" height="20" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 16L6.575 14.6L12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16Z" />
            </svg>
          )}
        </>
      )}
    </button>
  );
};

export default ButtonType;
