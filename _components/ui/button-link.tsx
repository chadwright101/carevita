import Link from "next/link";
import { buttonStyles } from "@/_styles/button-styles";

interface Props {
  children?: React.ReactNode;
  cssClasses?: string;
  href?: string;
  backgroundColor?: "blue" | "green" | "lightGreen" | "black" | "red";
  strokeColor?: "black" | "red";
}

const ButtonLink = ({
  children,
  href = "#",
  cssClasses,
  backgroundColor,
  strokeColor,
}: Props) => {
  return (
    <Link
      href={href}
      prefetch={false}
      className={buttonStyles(cssClasses, undefined, undefined, backgroundColor, undefined, strokeColor)}
    >
      {children || "View More"}
    </Link>
  );
};

export default ButtonLink;
