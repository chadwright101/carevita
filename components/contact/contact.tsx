import ContactForm from "./contact-form";
import Heading, { headingVariant } from "../heading";

interface Props {
  cssClasses?: string;
}

const Contact = ({ cssClasses }: Props) => {
  return (
    <section
      className={`px-6 tabletLarge:px-12 pt-10 pb-12 bg-blue ${cssClasses}`}
    >
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
