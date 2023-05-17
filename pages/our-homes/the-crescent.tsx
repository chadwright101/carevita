import Image from "next/image";

import Footer from "@/components/footer";
import Header from "@/components/header";
import IndividualHomesPageItem from "@/components/pages/individual-homes-pages/page-item";
import CrescentMap from "@/components/pages/individual-homes-pages/components/maps/crescent-map";
import Heading, { headingVariant } from "@/components/heading";
import ContactForm from "@/components/contact/contact-form";
import Layout from "@/components/layout";
import Fit from "@/components/pages/individual-homes-pages/components/#fit";

import pageList from "../../data/the-crescent-extended-data.json";

const TheCrescent = () => {
  return (
    <>
      <Header />
      <IndividualHomesPageItem homeList={pageList} />
      <Layout>
        <div className="desktopSmall:grid grid-cols-2 gap-10  mt-10">
          <Image
            src={pageList.locationDetail.image.url}
            alt={pageList.extendedTitle}
            width={700}
            height={400}
            className="object-cover w-full hidden h-[500px] desktopSmall:block"
            quality={50}
          />
          <CrescentMap cssClasses="w-full h-[400px] tabletLarge:h-[500px]" />
        </div>
        <hr className="text-black my-16" />
        <Fit cssClasses="mb-16" />
      </Layout>
      <section className="px-6 tabletLarge:px-12 pt-10 pb-12 bg-blue">
        <div className="w-full max-w-[1400px] mx-auto">
          <Heading
            variant={headingVariant.sectionHeading}
            cssClasses="text-white"
          >
            Contact The Crescent Lodge
          </Heading>
          <ContactForm crescent />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TheCrescent;
