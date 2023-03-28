import css from "styled-jsx/css";
import ContactForm from "../contact-form";
import Heading, { headingVariant } from "../heading";

interface Props {
  cssClasses?: string;
}

const Contact = ({ cssClasses }: Props) => {
  return (
    <section className={`px-6 tablet:px-12 py-10 bg-blue ${cssClasses}`}>
      <div className="w-full max-w-[1400px] mx-auto">
        <Heading
          variant={headingVariant.sectionHeading}
          cssClasses="text-white"
        >
          Contact
        </Heading>
      </div>
      <ContactForm />
    </section>
  );
};

export default Contact;
