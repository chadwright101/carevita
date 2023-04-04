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
      <h1
        className={`text-heading text-center mb-8 mt-10 tablet:mb-14 desktop:mb-10 tablet:text-left ${cssClasses}`}
      >
        {children}
      </h1>
    );
  } else if (variant === headingVariant.sectionHeading) {
    return (
      <h2
        className={`text-heading text-center mb-10 tablet:mb-12 desktop:mb-8 tablet:text-left ${cssClasses}`}
      >
        {children}
      </h2>
    );
  } else if (variant === headingVariant.subheading) {
    return (
      <h3
        className={`text-subheading text-center mb-8 tablet:mb-4 desktop:mb-8 tablet:text-left ${cssClasses}`}
      >
        {children}
      </h3>
    );
  } else {
    return null;
  }
};

export default Heading;
