import classNames from "classnames";
import { ReactNode } from "react";

interface Props {
  cssClasses?: string;
  children: ReactNode;
  variant: headingVariant;
}

export enum headingVariant {
  pageHeading,
  sectionHeading,
  subheading,
}

const Heading = ({ cssClasses, children, variant }: Props) => {
  if (variant === headingVariant.pageHeading) {
    return (
      <h1 className={classNames("text-heading", cssClasses)}>{children}</h1>
    );
  } else if (variant === headingVariant.sectionHeading) {
    return (
      <h2 className={classNames("text-heading", cssClasses)}>{children}</h2>
    );
  } else if (variant === headingVariant.subheading) {
    return (
      <h3 className={classNames("text-subheading", cssClasses)}>{children}</h3>
    );
  } else {
    return null;
  }
};

export default Heading;
