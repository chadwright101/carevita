import Footer from "@/components/footer";
import Header from "@/components/header";
import IndividualHomesPageItem from "@/components/individual-homes-pages/page-item";
import CrescentMap from "@/components/individual-homes-pages/components/maps/crescent-map";
import Heading, { headingVariant } from "@/components/heading";

import pageList from "../../data/carevita-data.json";
import ContactForm from "@/components/contact/contact-form";
import Layout from "@/components/layout";

const TheCrescent = () => {
  return (
    <>
      <Header />
      <IndividualHomesPageItem homeList={pageList.crescentPage} />
      <Layout>
        <CrescentMap cssClasses="w-full h-[400px] mt-10 tabletLarge:h-[500px]" />
      </Layout>
      <section className="px-6 tabletLarge:px-12 pt-10 pb-12 bg-blue mt-16">
        <div className="w-full max-w-[1400px] mx-auto">
          <Heading
            variant={headingVariant.sectionHeading}
            cssClasses="text-white"
          >
            Contact
          </Heading>
          <ContactForm crescent />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TheCrescent;
