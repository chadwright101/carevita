import css from "styled-jsx/css";
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
        <p className="text-white">
          Please select which facility you&nbsp;d like to get in touch with...
        </p>
      </div>
    </section>
  );
};

export default Contact;
