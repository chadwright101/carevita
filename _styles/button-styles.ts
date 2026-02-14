import classNames from "classnames";

export const buttonStyles = (
  cssClasses?: string,
  disabled?: boolean,
  pending?: boolean,
  variant?: "form" | "formBack" | "formNext" | "link",
) =>
  classNames(
    "text-subheading font-light ease-in-out duration-300",
    cssClasses,
    {
      "opacity-50 cursor-not-allowed": pending || disabled,
      "desktop:hover:cursor-pointer": !(disabled || pending),
      "bg-green text-white px-6 py-2.5 flex gap-6 items-center":
        variant === "form" || variant === "formNext",
      "desktop:hover:bg-green/80":
        (variant === "form" || variant === "formNext" || variant === "link") &&
        !(disabled || pending),
      "bg-lightGreen text-white px-6 py-2.5": variant === "formBack",
      "px-12 py-2.5 bg-green text-white drop-shadow-md tablet:px-10":
        variant === "link",
    },
  );
