import Footer from "@/components/footer";
import Header from "@/components/header";
import IndividualHomesPageItem from "@/components/pages/individual-homes-pages/page-item";
import EastlandsMap from "@/components/pages/individual-homes-pages/components/maps/eastlands-map";
import Heading, { headingVariant } from "@/components/heading";
import ContactForm from "@/components/contact/contact-form";
import Layout from "@/components/layout";
import Fit from "@/components/pages/individual-homes-pages/components/#fit";

import pageList from "../../data/eastlands-extended-data.json";
import ImageContainer from "@/components/utils/image-container";

const Eastlands = () => {
  return (
    <>
      <Header />
      <IndividualHomesPageItem homeList={pageList} />
      <Layout>
        <div className="desktopSmall:grid grid-cols-2 gap-10  mt-10">
          <ImageContainer
            src={pageList.locationDetail.image.url}
            alt={pageList.extendedTitle}
            width={900}
            height={600}
            cssClasses="object-cover w-full hidden h-[500px] desktopSmall:block"
            desktopSmall={50}
            desktop={40}
          />
          <EastlandsMap cssClasses="w-full h-[400px] tabletLarge:h-[500px]" />
        </div>
        <hr className="text-black my-16" />
        <Fit cssClasses="mb-16" />
      </Layout>
      <section className="px-6 tabletLarge:px-12 pt-10 pb-12 bg-blue mt-16">
        <div className="w-full max-w-[1400px] mx-auto">
          <Heading
            variant={headingVariant.sectionHeading}
            cssClasses="text-white"
          >
            Contact Eastlands Estate
          </Heading>
          <ContactForm eastlands />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Eastlands;
