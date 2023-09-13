import { useRouter } from "next/router";

import PropertyPageContactForm from "./property-pages/property-pages-contact-form";
import HomePageContactForm from "./home-page/home-page-contact-form";

import crescentData from "@/data/crescent-data.json";
import eastlandsData from "@/data/eastlands-data.json";
import sereneData from "@/data/serene-data.json";
import parsonageData from "@/data/parsonage-data.json";

const ContactForm = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  if (currentPath === "/our-homes/the-crescent") {
    return <PropertyPageContactForm data={crescentData} />;
  } else if (currentPath === "/our-homes/eastlands") {
    return <PropertyPageContactForm data={eastlandsData} />;
  } else if (currentPath === "/our-homes/serene-park") {
    return <PropertyPageContactForm data={sereneData} />;
  } else if (currentPath === "/our-homes/parsonage-street-home") {
    return <PropertyPageContactForm data={parsonageData} />;
  } else {
    return <HomePageContactForm />;
  }
};

export default ContactForm;
