import Image from "next/image";

import Footer from "@/components/footer";
import Header from "@/components/header";
import IndividualHomesPageItem from "@/components/pages/individual-homes-pages/page-item";
import EastlandsMap from "@/components/pages/individual-homes-pages/components/maps/serene-park-map";
import Heading, { headingVariant } from "@/components/heading";
import ContactForm from "@/components/contact/contact-form";
import Layout from "@/components/layout";

import pageList from "../../data/serene-park-extended-data.json";

const Eastlands = () => {
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
          />
          <EastlandsMap cssClasses="w-full h-[400px] tabletLarge:h-[500px]" />
        </div>
      </Layout>
      <section className="px-6 tabletLarge:px-12 pt-10 pb-12 bg-blue mt-16">
        <div className="w-full max-w-[1400px] mx-auto">
          <Heading
            variant={headingVariant.sectionHeading}
            cssClasses="text-white"
          >
            Contact
          </Heading>
          <ContactForm serenePark />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Eastlands;
