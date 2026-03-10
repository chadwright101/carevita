import HomePageContactForm from "./home-page/home-page-contact-form";
import { FacilityNavigation } from "@/_types/facility-types";

interface Props {
  facilities: FacilityNavigation[];
}

const ContactForm = ({ facilities }: Props) => {
  return <HomePageContactForm facilities={facilities} />;
};

export default ContactForm;
