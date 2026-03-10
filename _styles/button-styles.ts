import classNames from "classnames";

export const buttonStyles = (
  cssClasses?: string,
  disabled?: boolean,
  pending?: boolean,
  backgroundColor?: "blue" | "green" | "lightGreen" | "black" | "red",
  type?: "button" | "submit",
  strokeColor?: "black" | "red",
) =>
  classNames(
    "text-paragraph px-6 py-2.5 flex gap-6 font-light ease-in-out duration-300 rounded-md",
    cssClasses,
    {
      "bg-blue text-white": !strokeColor,
      "opacity-50 cursor-not-allowed": pending || disabled,
      "desktop:hover:bg-blue/90":
        !(disabled || pending) &&
        (!backgroundColor || backgroundColor === "blue") &&
        !strokeColor,
      "desktop:hover:cursor-pointer": !(disabled || pending),
      "bg-green items-center": backgroundColor === "green",
      "desktop:hover:bg-green/90":
        backgroundColor === "green" && !(disabled || pending),
      "bg-lightGreen": backgroundColor === "lightGreen",
      "desktop:hover:bg-lightGreen/90":
        backgroundColor === "lightGreen" && !(disabled || pending),
      "bg-black": backgroundColor === "black",
      "desktop:hover:bg-black/90":
        backgroundColor === "black" && !(disabled || pending),
      "bg-error": backgroundColor === "red",
      "desktop:hover:bg-error/90":
        backgroundColor === "red" && !(disabled || pending),
      "border-2 border-black text-black font-normal": strokeColor === "black",
      "desktop:hover:bg-black/10":
        strokeColor === "black" && !(disabled || pending),
      "border-2 border-error text-error font-normal": strokeColor === "red",
      "desktop:hover:bg-error/10":
        strokeColor === "red" && !(disabled || pending),
      "min-w-[150px] flex items-center justify-center": type === "submit",
    },
  );
