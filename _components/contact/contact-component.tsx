"use client";

import classNames from "classnames";
import ContactForm from "./contact-form";
import Heading, { headingVariant } from "../ui/heading";

interface Props {
  cssClasses?: string;
}

const ContactComponent = ({ cssClasses }: Props) => {
  return (
    <section className={classNames("px-6 tablet:px-12 pt-10 pb-12 bg-blue", cssClasses)}>
      <div className="w-full max-w-[1280px] mx-auto">
        <Heading
          variant={headingVariant.sectionHeading}
          cssClasses="text-white mb-5 text-center tablet:text-left"
        >
          Contact
        </Heading>
      </div>
      <ContactForm />
    </section>
  );
};

export default ContactComponent;
