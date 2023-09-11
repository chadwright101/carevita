import IndividualHomesPageItem from "@/components/pages/property-pages/page-item";
import CrescentMap from "@/components/contact/maps/crescent-map";
import Heading, { headingVariant } from "@/components/heading";
import ContactForm from "@/components/contact/contact-form";
import Layout from "@/components/layout";
import Fit from "@/components/pages/property-pages/components/#fit";
import ImageContainer from "@/components/utils/image-container";

import crescentData from "@/data/crescent-data.json";

const TheCrescent = () => {
  const {
    general: { title },
    images: { gallerySlider },
  } = crescentData;
  return (
    <>
      <IndividualHomesPageItem data={crescentData} />
      <Layout>
        <div className="desktopSmall:grid grid-cols-2 gap-10  mt-10">
          <ImageContainer
            src={gallerySlider[21]}
            alt={title}
            width={700}
            height={400}
            cssClasses="object-cover w-full hidden h-[500px] desktopSmall:block"
            desktopSmall={50}
            desktop={40}
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
            <span className=" font-thin text-white">Contact</span> The Crescent
          </Heading>
          <ContactForm />
        </div>
      </section>
    </>
  );
};

export default TheCrescent;
