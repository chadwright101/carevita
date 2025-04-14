import { useRouter } from "next/router";

import PropertyPagesContactForm from "./property-pages/property-pages-contact-form";
import HomePageContactForm from "./home-page/home-page-contact-form";

import crescentData from "@/data/crescent-data.json";
import eastlandsData from "@/data/eastlands-data.json";
import sereneData from "@/data/serene-data.json";
import parsonageData from "@/data/parsonage-data.json";
import hartlandData from "@/data/hartland-data.json";

const ContactForm = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  if (currentPath === "/our-homes/the-crescent") {
    return <PropertyPagesContactForm data={crescentData} />;
  } else if (currentPath === "/our-homes/eastlands") {
    return <PropertyPagesContactForm data={eastlandsData} />;
  } else if (currentPath === "/our-homes/serene-park") {
    return <PropertyPagesContactForm data={sereneData} />;
  } else if (currentPath === "/our-homes/parsonage-street-home") {
    return <PropertyPagesContactForm data={parsonageData} />;
  } else if (currentPath === "/our-homes/hartland-estate") {
    return <PropertyPagesContactForm data={hartlandData} />;
  } else {
    return <HomePageContactForm />;
  }
};

export default ContactForm;
