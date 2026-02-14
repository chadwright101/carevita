"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { buttonStyles } from "@/_styles/button-styles";

interface Props {
  children?: ReactNode;
  cssClasses?: string;
  url?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  variant?: "form" | "formBack" | "formNext" | "link";
  type?: "button" | "submit";
}

const Button = ({
  children,
  cssClasses,
  url,
  onClick,
  disabled,
  variant = "link",
}: Props) => {
  const { pending } = useFormStatus();

  if (variant === "form") {
    return (
      <button
        className={buttonStyles(cssClasses, disabled, pending, "form")}
        type="submit"
        disabled={disabled || pending}
      >
        {pending ? (
          <div className="flex justify-center items-center w-[120px] py-1.5">
            <div className="spinner-large"></div>
          </div>
        ) : (
          <>
            {children}
            <Image
              src="/assets/icons/arrow_forward-white.svg"
              alt="Arrow icon"
              width={20}
              height={20}
            />
          </>
        )}
      </button>
    );
  }

  if (variant === "formBack") {
    return (
      <button
        className={buttonStyles(cssClasses, disabled, pending, "formBack")}
        onClick={onClick}
        type="button"
      >
        {children}
      </button>
    );
  }

  if (variant === "formNext") {
    return (
      <button
        className={buttonStyles(cssClasses, disabled, pending, "formNext")}
        onClick={onClick}
        type="button"
      >
        Next
        <Image
          src="/assets/icons/arrow_forward-white.svg"
          alt="Arrow icon"
          width={20}
          height={20}
        />
      </button>
    );
  }

  return (
    <button className="mx-auto">
      <Link
        prefetch={false}
        href={url!}
        className={buttonStyles(cssClasses, disabled, pending, "link")}
      >
        {children || "View More"}
      </Link>
    </button>
  );
};

export default Button;
