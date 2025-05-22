import IndividualHomesPageItem from "@/components/pages/property-pages/page-item";
import Heading, { headingVariant } from "@/components/heading";
import ContactForm from "@/components/contact/contact-form";
import Layout from "@/components/layout";
import ImageContainer from "@/components/utils/image-container";
import HartlandMap from "@/components/contact/maps/hartland-map";

import hartlandData from "@/data/hartland-data.json";

const HartlandEstate = () => {
  const {
    general: { title },
    images: { gallerySlider },
  } = hartlandData;
  return (
    <>
      <IndividualHomesPageItem data={hartlandData} />
      <Layout>
        <div className="desktopSmall:grid grid-cols-2 gap-10  mt-10">
          <ImageContainer
            src={gallerySlider[1]}
            alt={title}
            width={700}
            height={400}
            cssClasses="object-cover w-full hidden h-[500px] desktopSmall:block"
            desktop={50}
          />
          <HartlandMap cssClasses="w-full h-[400px] tabletLarge:h-[500px] mb-16" />
        </div>
      </Layout>
      <div
        id="contact"
        className="-translate-y-28 tablet:-translate-y-32 desktop:-translate-y-28"
      ></div>
      <section className="px-6 tabletLarge:px-12 pt-10 pb-12 bg-blue">
        <div className="w-full max-w-[1400px] mx-auto">
          <Heading
            variant={headingVariant.sectionHeading}
            cssClasses="text-white"
          >
            <span className=" font-thin text-white">Contact</span> {title}
          </Heading>
          <ContactForm />
        </div>
      </section>
    </>
  );
};

export default HartlandEstate;
